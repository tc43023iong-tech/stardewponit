// Web Audio API Retro Sound & Background Music Synthesizer for Stardew Valley English Adventure

export type AmbientTimeOfDay = 'dawn' | 'day' | 'sunset' | 'night';

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isMusicPlaying: boolean = false;
  public isAmbientEnabled: boolean = true;
  private musicInterval: any = null;
  private currentStep: number = 0;
  private bgmGainNode: GainNode | null = null;

  // Ambient Soundscape State
  private ambientTimeOfDay: AmbientTimeOfDay = 'day';
  private isAmbientDesired: boolean = false;
  private ambientRunning: boolean = false;
  private ambientMasterGain: GainNode | null = null;
  private ambientNodes: AudioNode[] = [];
  private ambientTimers: number[] = [];
  private ambientNoiseBuffer: AudioBuffer | null = null;

  constructor() {
    try {
      const savedMute =
        localStorage.getItem('stardew_sound_muted') ??
        localStorage.getItem('pokemon_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedMusic = localStorage.getItem('stardew_bgm_enabled');
      // Default to true for cozy farm music unless disabled
      this.isMusicPlaying = savedMusic !== 'false';

      const savedAmbient = localStorage.getItem('stardew_ambient_audio_enabled');
      this.isAmbientEnabled = savedAmbient !== 'false';
    } catch {
      // ignore storage errors
    }

    // Unlock Web Audio Context early on first user interaction (Windows/Chrome/iframe safe)
    if (typeof window !== 'undefined') {
      const unlock = () => {
        const ctx = this.initCtx();
        if (ctx && ctx.state === 'running') {
          this.syncAmbientAfterUnlock();
        } else if (ctx && ctx.state === 'suspended') {
          ctx
            .resume()
            .then(() => this.syncAmbientAfterUnlock())
            .catch(() => {});
        }
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
    }
  }

  private syncAmbientAfterUnlock() {
    if (this.isAmbientDesired && this.isAmbientEnabled && !this.isMuted && !this.ambientRunning) {
      this.buildAndStartAmbientGraph(this.ambientTimeOfDay);
    }
  }

  private initCtx(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx
          .resume()
          .then(() => this.syncAmbientAfterUnlock())
          .catch(() => {});
      }
    } catch {
      // ignore audio context creation failure
    }
    return this.ctx;
  }

  private withAudio(fn: (ctx: AudioContext) => void) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx
          .resume()
          .then(() => {
            if (!this.isMuted && this.ctx) {
              fn(this.ctx);
            }
          })
          .catch(() => {});
      } else {
        fn(ctx);
      }
    } catch {
      // Audio policy catch
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('stardew_sound_muted', String(this.isMuted));
      localStorage.setItem('pokemon_sound_muted', String(this.isMuted));
    } catch {}
    if (this.isMuted) {
      this.pauseMusic();
      this.teardownAmbientGraph();
    } else {
      if (this.isMusicPlaying) {
        this.startMusic();
      }
      if (this.isAmbientDesired && this.isAmbientEnabled) {
        this.startAmbient(this.ambientTimeOfDay);
      }
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public toggleMusic(): boolean {
    this.isMusicPlaying = !this.isMusicPlaying;
    try {
      localStorage.setItem('stardew_bgm_enabled', String(this.isMusicPlaying));
    } catch {}
    if (this.isMusicPlaying) {
      this.startMusic();
    } else {
      this.pauseMusic();
    }
    return this.isMusicPlaying;
  }

  // --- Ambient Nature Soundscapes (Synced with Stardew Time of Day) ---

  public toggleAmbient(): boolean {
    this.isAmbientEnabled = !this.isAmbientEnabled;
    try {
      localStorage.setItem('stardew_ambient_audio_enabled', String(this.isAmbientEnabled));
    } catch {}
    if (this.isAmbientEnabled && this.isAmbientDesired && !this.isMuted) {
      this.startAmbient(this.ambientTimeOfDay);
    } else {
      this.teardownAmbientGraph();
    }
    return this.isAmbientEnabled;
  }

  public startAmbient(tod?: AmbientTimeOfDay) {
    if (tod) {
      const changed = tod !== this.ambientTimeOfDay;
      this.ambientTimeOfDay = tod;
      this.isAmbientDesired = true;
      if (this.isMuted || !this.isAmbientEnabled) {
        this.teardownAmbientGraph();
        return;
      }
      if (this.ambientRunning) {
        if (changed) {
          this.buildAndStartAmbientGraph(this.ambientTimeOfDay);
        }
        return;
      }
    } else {
      this.isAmbientDesired = true;
      if (this.isMuted || !this.isAmbientEnabled) {
        this.teardownAmbientGraph();
        return;
      }
      if (this.ambientRunning) return;
    }

    const ctx = this.initCtx();
    if (!ctx) return;
    if (ctx.state === 'running') {
      this.buildAndStartAmbientGraph(this.ambientTimeOfDay);
    } else {
      ctx
        .resume()
        .then(() => {
          if (this.isAmbientDesired && this.isAmbientEnabled && !this.isMuted && !this.ambientRunning) {
            this.buildAndStartAmbientGraph(this.ambientTimeOfDay);
          }
        })
        .catch(() => {});
    }
  }

  public setAmbientTimeOfDay(tod: AmbientTimeOfDay) {
    if (this.ambientTimeOfDay === tod && this.ambientRunning) return;
    this.ambientTimeOfDay = tod;
    if (this.isAmbientDesired && this.isAmbientEnabled && !this.isMuted) {
      this.startAmbient(tod);
    }
  }

  public stopAmbient() {
    this.isAmbientDesired = false;
    this.teardownAmbientGraph();
  }

  private getOrCreatePinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.ambientNoiseBuffer && this.ambientNoiseBuffer.sampleRate === ctx.sampleRate) {
      return this.ambientNoiseBuffer;
    }
    const durationSec = 3;
    const length = ctx.sampleRate * durationSec;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Paul Kellet's refined pink noise algorithm
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    // Smooth crossfade loop edges so looping never clicks
    const fadeSamples = Math.floor(ctx.sampleRate * 0.08);
    for (let i = 0; i < fadeSamples; i++) {
      const t = i / fadeSamples;
      const tailIdx = length - fadeSamples + i;
      const blended = data[i] * t + data[tailIdx] * (1 - t);
      data[i] = blended;
      data[tailIdx] = blended;
    }

    this.ambientNoiseBuffer = buffer;
    return buffer;
  }

  private clearAmbientTimers() {
    this.ambientTimers.forEach((id) => window.clearTimeout(id));
    this.ambientTimers = [];
  }

  private teardownAmbientGraph() {
    this.ambientRunning = false;
    this.clearAmbientTimers();

    const oldGain = this.ambientMasterGain;
    const oldNodes = this.ambientNodes;
    this.ambientMasterGain = null;
    this.ambientNodes = [];

    if (oldGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        oldGain.gain.cancelScheduledValues(now);
        oldGain.gain.setValueAtTime(oldGain.gain.value, now);
        oldGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      } catch {}
    }

    window.setTimeout(() => {
      oldNodes.forEach((node) => {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {}
      });
      if (oldGain) {
        try {
          oldGain.disconnect();
        } catch {}
      }
    }, 380);
  }

  private buildAndStartAmbientGraph(tod: AmbientTimeOfDay) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') return;

    // Gracefully fade out previous track before launching new timeOfDay track
    this.teardownAmbientGraph();

    this.ambientRunning = true;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(1.0, now + 0.65);
    masterGain.connect(ctx.destination);
    this.ambientMasterGain = masterGain;

    const noiseBuffer = this.getOrCreatePinkNoiseBuffer(ctx);
    const trackNodes: AudioNode[] = [];

    const scheduleLoop = (minMs: number, maxMs: number, fn: () => void, initialDelayMs = 450) => {
      const run = () => {
        if (!this.ambientRunning || this.ambientMasterGain !== masterGain || this.isMuted || !this.isAmbientEnabled) {
          return;
        }
        if (this.ctx && this.ctx.state === 'running') {
          fn();
        }
        const nextDelay = minMs + Math.random() * (maxMs - minMs);
        const timerId = window.setTimeout(run, nextDelay);
        this.ambientTimers.push(timerId);
      };
      const initId = window.setTimeout(run, initialDelayMs);
      this.ambientTimers.push(initId);
    };

    const connectPanOrMaster = (node: AudioNode, panVal?: number) => {
      if (typeof ctx.createStereoPanner === 'function' && panVal !== undefined) {
        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(panVal, ctx.currentTime);
        node.connect(panner);
        panner.connect(masterGain);
      } else {
        node.connect(masterGain);
      }
    };

    // Helper: Natural bird chirp phrase
    const playBirdChirp = (baseFreq: number, notesCount: number, vol = 0.036) => {
      const t0 = ctx.currentTime;
      const pan = (Math.random() - 0.5) * 1.1;
      for (let i = 0; i < notesCount; i++) {
        const start = t0 + i * (0.095 + Math.random() * 0.045);
        const dur = 0.075 + Math.random() * 0.045;
        const fStart = baseFreq * (0.92 + Math.random() * 0.18);
        const fPeak = fStart * (1.22 + Math.random() * 0.24);

        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fStart, start);
        osc.frequency.exponentialRampToValueAtTime(fPeak, start + dur * 0.45);
        osc.frequency.exponentialRampToValueAtTime(fStart * 1.05, start + dur);

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(26 + Math.random() * 14, start);
        lfoGain.gain.setValueAtTime(35, start);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(vol, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

        osc.connect(gain);
        connectPanOrMaster(gain, pan);

        osc.start(start);
        lfo.start(start);
        osc.stop(start + dur + 0.02);
        lfo.stop(start + dur + 0.02);
      }
    };

    if (tod === 'dawn') {
      // 🌅 DAWN: Crisp morning breeze + lively songbird chorus & gentle morning dove
      const breezeSrc = ctx.createBufferSource();
      breezeSrc.buffer = noiseBuffer;
      breezeSrc.loop = true;

      const breezeFilter = ctx.createBiquadFilter();
      breezeFilter.type = 'lowpass';
      breezeFilter.frequency.setValueAtTime(580, now);

      const breezeLfo = ctx.createOscillator();
      const breezeLfoGain = ctx.createGain();
      breezeLfo.frequency.setValueAtTime(0.14, now);
      breezeLfoGain.gain.setValueAtTime(190, now);
      breezeLfo.connect(breezeLfoGain);
      breezeLfoGain.connect(breezeFilter.frequency);

      const breezeGain = ctx.createGain();
      breezeGain.gain.setValueAtTime(0.022, now);

      breezeSrc.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(masterGain);

      breezeSrc.start(now);
      breezeLfo.start(now);
      trackNodes.push(breezeSrc, breezeFilter, breezeLfo, breezeLfoGain, breezeGain);

      // Morning songbirds
      scheduleLoop(
        1100,
        2800,
        () => {
          const baseFreq = 1900 + Math.random() * 1050;
          const count = Math.random() < 0.45 ? 3 : 2;
          playBirdChirp(baseFreq, count, 0.036);
        },
        350
      );

      // Gentle morning cuckoo / wood dove call
      scheduleLoop(
        4200,
        7800,
        () => {
          const t = ctx.currentTime;
          const pan = (Math.random() - 0.5) * 0.9;
          [698.46, 554.37].forEach((freq, idx) => {
            const st = t + idx * 0.24;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, st);
            g.gain.setValueAtTime(0.0001, st);
            g.gain.linearRampToValueAtTime(0.024, st + 0.035);
            g.gain.exponentialRampToValueAtTime(0.0001, st + 0.22);
            osc.connect(g);
            connectPanOrMaster(g, pan);
            osc.start(st);
            osc.stop(st + 0.24);
          });
        },
        1900
      );
    } else if (tod === 'day') {
      // ☀️ DAY: Soothing babbling brook (潺潺流水) + sunlit afternoon birds
      const streamBodySrc = ctx.createBufferSource();
      streamBodySrc.buffer = noiseBuffer;
      streamBodySrc.loop = true;

      const streamFilter = ctx.createBiquadFilter();
      streamFilter.type = 'bandpass';
      streamFilter.frequency.setValueAtTime(760, now);
      streamFilter.Q.setValueAtTime(1.5, now);

      const streamLfo = ctx.createOscillator();
      const streamLfoGain = ctx.createGain();
      streamLfo.frequency.setValueAtTime(0.34, now);
      streamLfoGain.gain.setValueAtTime(240, now);
      streamLfo.connect(streamLfoGain);
      streamLfoGain.connect(streamFilter.frequency);

      const streamGain = ctx.createGain();
      streamGain.gain.setValueAtTime(0.044, now);

      streamBodySrc.connect(streamFilter);
      streamFilter.connect(streamGain);
      streamGain.connect(masterGain);

      // Upper water sparkle shimmer layer
      const sparkleSrc = ctx.createBufferSource();
      sparkleSrc.buffer = noiseBuffer;
      sparkleSrc.loop = true;

      const sparkleFilter = ctx.createBiquadFilter();
      sparkleFilter.type = 'bandpass';
      sparkleFilter.frequency.setValueAtTime(2150, now);
      sparkleFilter.Q.setValueAtTime(2.4, now);

      const sparkleLfo = ctx.createOscillator();
      const sparkleLfoGain = ctx.createGain();
      sparkleLfo.frequency.setValueAtTime(0.68, now);
      sparkleLfoGain.gain.setValueAtTime(480, now);
      sparkleLfo.connect(sparkleLfoGain);
      sparkleLfoGain.connect(sparkleFilter.frequency);

      const sparkleGain = ctx.createGain();
      sparkleGain.gain.setValueAtTime(0.02, now);

      sparkleSrc.connect(sparkleFilter);
      sparkleFilter.connect(sparkleGain);
      sparkleGain.connect(masterGain);

      streamBodySrc.start(now);
      streamLfo.start(now);
      sparkleSrc.start(now);
      sparkleLfo.start(now);
      trackNodes.push(
        streamBodySrc,
        streamFilter,
        streamLfo,
        streamLfoGain,
        streamGain,
        sparkleSrc,
        sparkleFilter,
        sparkleLfo,
        sparkleLfoGain,
        sparkleGain
      );

      // Water droplet / brook bubble blips
      scheduleLoop(
        550,
        1550,
        () => {
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const f1 = 520 + Math.random() * 520;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f1, t);
          osc.frequency.exponentialRampToValueAtTime(f1 * 1.85, t + 0.055);
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.022, t + 0.008);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.065);
          osc.connect(g);
          connectPanOrMaster(g, (Math.random() - 0.5) * 1.2);
          osc.start(t);
          osc.stop(t + 0.07);
        },
        300
      );

      // Gentle daytime sparrows in the distance
      scheduleLoop(
        3400,
        6600,
        () => {
          playBirdChirp(2200 + Math.random() * 700, 2, 0.024);
        },
        1400
      );
    } else if (tod === 'sunset') {
      // 🌇 SUNSET: Warm dusk wind + golden evening cicadas + homing birds
      const windSrc = ctx.createBufferSource();
      windSrc.buffer = noiseBuffer;
      windSrc.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(460, now);

      const windLfo = ctx.createOscillator();
      const windLfoGain = ctx.createGain();
      windLfo.frequency.setValueAtTime(0.11, now);
      windLfoGain.gain.setValueAtTime(160, now);
      windLfo.connect(windLfoGain);
      windLfoGain.connect(windFilter.frequency);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.028, now);

      windSrc.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);

      windSrc.start(now);
      windLfo.start(now);
      trackNodes.push(windSrc, windFilter, windLfo, windLfoGain, windGain);

      // Soft evening cicada shimmer swell
      scheduleLoop(
        4200,
        7500,
        () => {
          const t = ctx.currentTime;
          const dur = 2.1 + Math.random() * 1.1;
          const cicadaSrc = ctx.createBufferSource();
          cicadaSrc.buffer = noiseBuffer;
          cicadaSrc.loop = true;

          const band = ctx.createBiquadFilter();
          band.type = 'bandpass';
          band.frequency.setValueAtTime(4100 + Math.random() * 500, t);
          band.Q.setValueAtTime(6.0, t);

          const pulseGain = ctx.createGain();
          pulseGain.gain.setValueAtTime(0.0001, t);
          pulseGain.gain.linearRampToValueAtTime(0.016, t + 0.65);
          pulseGain.gain.linearRampToValueAtTime(0.014, t + dur - 0.8);
          pulseGain.gain.linearRampToValueAtTime(0.0001, t + dur);

          cicadaSrc.connect(band);
          band.connect(pulseGain);
          connectPanOrMaster(pulseGain, (Math.random() - 0.5) * 1.1);

          cicadaSrc.start(t);
          cicadaSrc.stop(t + dur + 0.05);
        },
        600
      );

      // Homing twilight bird whistle
      scheduleLoop(
        2600,
        5200,
        () => {
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const startF = 1850 + Math.random() * 350;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(startF, t);
          osc.frequency.exponentialRampToValueAtTime(startF * 0.72, t + 0.22);

          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.026, t + 0.025);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

          osc.connect(g);
          connectPanOrMaster(g, (Math.random() - 0.5) * 1.0);
          osc.start(t);
          osc.stop(t + 0.27);
        },
        1300
      );
    } else {
      // 🌙 NIGHT: Quiet night breeze + crisp rhythmic crickets (夜晚蟲鳴) + distant pond frogs
      const nightAirSrc = ctx.createBufferSource();
      nightAirSrc.buffer = noiseBuffer;
      nightAirSrc.loop = true;

      const nightFilter = ctx.createBiquadFilter();
      nightFilter.type = 'lowpass';
      nightFilter.frequency.setValueAtTime(320, now);

      const nightGain = ctx.createGain();
      nightGain.gain.setValueAtTime(0.015, now);

      nightAirSrc.connect(nightFilter);
      nightFilter.connect(nightGain);
      nightGain.connect(masterGain);

      nightAirSrc.start(now);
      trackNodes.push(nightAirSrc, nightFilter, nightGain);

      // Rhythmic cricket chirp trains
      scheduleLoop(
        950,
        2350,
        () => {
          const t = ctx.currentTime;
          const pulses = Math.random() < 0.5 ? 4 : 3;
          const cricketPitch = Math.random() < 0.5 ? 4350 : 4820;
          const pan = (Math.random() - 0.5) * 1.3;

          for (let i = 0; i < pulses; i++) {
            const st = t + i * 0.056;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(cricketPitch, st);

            g.gain.setValueAtTime(0.0001, st);
            g.gain.linearRampToValueAtTime(0.025, st + 0.006);
            g.gain.exponentialRampToValueAtTime(0.0001, st + 0.036);

            osc.connect(g);
            connectPanOrMaster(g, pan);
            osc.start(st);
            osc.stop(st + 0.042);
          }
        },
        320
      );

      // Soft distant pond frog croaks
      scheduleLoop(
        3800,
        7400,
        () => {
          const t = ctx.currentTime;
          const pan = (Math.random() - 0.5) * 1.1;
          [0, 0.19].forEach((offset, idx) => {
            const st = t + offset;
            const osc = ctx.createOscillator();
            const lp = ctx.createBiquadFilter();
            const g = ctx.createGain();

            osc.type = 'sawtooth';
            const f1 = idx === 0 ? 175 : 195;
            osc.frequency.setValueAtTime(f1, st);
            osc.frequency.exponentialRampToValueAtTime(f1 * 1.28, st + 0.09);

            lp.type = 'lowpass';
            lp.frequency.setValueAtTime(460, st);

            g.gain.setValueAtTime(0.0001, st);
            g.gain.linearRampToValueAtTime(0.026, st + 0.015);
            g.gain.exponentialRampToValueAtTime(0.0001, st + 0.11);

            osc.connect(lp);
            lp.connect(g);
            connectPanOrMaster(g, pan);

            osc.start(st);
            osc.stop(st + 0.12);
          });
        },
        1700
      );
    }

    this.ambientNodes = trackNodes;
  }

  // --- Background Music: Cozy Stardew Valley Pastoral Sequence ---
  public startMusic() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    this.isMusicPlaying = true;
    try {
      localStorage.setItem('stardew_bgm_enabled', 'true');
    } catch {}

    // Melody and Bass Arpeggio Sequence (C - G - Am - F)
    const sequence = [
      // Bar 1: C Major
      { lead: 523.25, bass: 261.63 },
      { lead: 0, bass: 329.63 },
      { lead: 659.25, bass: 392.0 },
      { lead: 523.25, bass: 523.25 },
      { lead: 783.99, bass: 392.0 },
      { lead: 659.25, bass: 329.63 },
      { lead: 523.25, bass: 261.63 },
      { lead: 587.33, bass: 329.63 },

      // Bar 2: G Major
      { lead: 392.0, bass: 196.0 },
      { lead: 0, bass: 246.94 },
      { lead: 587.33, bass: 293.66 },
      { lead: 493.88, bass: 392.0 },
      { lead: 587.33, bass: 293.66 },
      { lead: 659.25, bass: 246.94 },
      { lead: 587.33, bass: 196.0 },
      { lead: 493.88, bass: 293.66 },

      // Bar 3: A Minor
      { lead: 440.0, bass: 220.0 },
      { lead: 0, bass: 261.63 },
      { lead: 523.25, bass: 329.63 },
      { lead: 659.25, bass: 440.0 },
      { lead: 523.25, bass: 329.63 },
      { lead: 440.0, bass: 261.63 },
      { lead: 523.25, bass: 220.0 },
      { lead: 659.25, bass: 329.63 },

      // Bar 4: F Major
      { lead: 698.46, bass: 174.61 },
      { lead: 0, bass: 220.0 },
      { lead: 659.25, bass: 261.63 },
      { lead: 587.33, bass: 349.23 },
      { lead: 523.25, bass: 261.63 },
      { lead: 440.0, bass: 220.0 },
      { lead: 493.88, bass: 261.63 },
      { lead: 523.25, bass: 349.23 },
    ];

    const stepDurationMs = 280;
    this.currentStep = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying || this.isMuted || !this.ctx || this.ctx.state !== 'running') return;
      const note = sequence[this.currentStep % sequence.length];
      const now = this.ctx.currentTime;

      if (note.bass > 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(note.bass, now);

        bassGain.gain.setValueAtTime(0.04, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.35);
      }

      if (note.lead > 0) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(note.lead, now);

        leadGain.gain.setValueAtTime(0.055, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

        leadOsc.connect(leadGain);
        leadGain.connect(this.ctx.destination);
        leadOsc.start(now);
        leadOsc.stop(now + 0.42);
      }

      this.currentStep = (this.currentStep + 1) % sequence.length;
    };

    playNextNote();
    this.musicInterval = setInterval(playNextNote, stepDurationMs);
  }

  public pauseMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // --- Sound Effects ---

  // Wooden tap click
  public playClick() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    });
  }

  // Dedicated Stardew Positive Point Award Sound (+points)
  public playPointAdd() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      // Cheerful rising coin + Stardew sparkle chord (C5 -> E5 -> G5 -> C6 -> E6)
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.055;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx >= 3 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.24, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.34);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    });
  }

  // Dedicated Stardew Point Deduction Sound (-points)
  public playPointDeduct() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      // Audible gentle descending reminder tones (A4 -> F4 -> D4) — crisp on all speakers
      const notes = [440.0, 349.23, 277.18];
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.095;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.26, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.25);

        // Subtle warm overtone for clarity on small speakers
        const over = ctx.createOscillator();
        const overGain = ctx.createGain();
        over.type = 'sawtooth';
        over.frequency.setValueAtTime(freq * 0.5, start);
        overGain.gain.setValueAtTime(0.001, start);
        overGain.gain.linearRampToValueAtTime(0.07, start + 0.01);
        overGain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
        over.connect(overGain);
        overGain.connect(ctx.destination);
        over.start(start);
        over.stop(start + 0.17);
      });
    });
  }

  // Soft undo / erase blip
  public playUndo() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.14);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    });
  }

  // Bubbling water splash sound for irrigating garden crops
  public playWatering() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const drops = [
        { start: 0, f1: 480, f2: 920 },
        { start: 0.08, f1: 580, f2: 1120 },
        { start: 0.16, f1: 680, f2: 1320 },
      ];
      drops.forEach((d) => {
        const t = now + d.start;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(d.f1, t);
        osc.frequency.exponentialRampToValueAtTime(d.f2, t + 0.08);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
      });
    });
  }

  // Joyful harvest chime when picking mature crops
  public playHarvest() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const notes = [659.25, 880.0, 1046.5, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.22, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.36);
      });
    });
  }

  // Cheerful correct chime
  public playCorrect() {
    this.playPointAdd();
  }

  // Gentle low wobble for mistakes (encouraging, not harsh)
  public playIncorrect() {
    this.playPointDeduct();
  }

  // Sparkly coin or gem pickup
  public playCollect() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    });
  }

  // Crisp sparkling "叮一聲" level-up chime for paradise companion growth
  public playDingChime() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const notes = [1046.5, 1318.51, 1567.98, 2093.0];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.26, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.56);
      });
    });
  }

  // Gentle happy purr / chirp when petting companion
  public playPetSound() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1174.66];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.04;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.29);
      });
    });
  }

  // Cheerful bubbly pop sound for click-to-run sprint and interaction
  public playPop() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    });
  }

  // Victory fanfare for level completion
  public playVictory() {
    this.withAudio((ctx) => {
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.25 },
        { f: 880.0, d: 0.12 },
        { f: 1046.5, d: 0.4 },
      ];
      let cur = ctx.currentTime;
      melody.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, cur);

        gain.gain.setValueAtTime(0.22, cur);
        gain.gain.exponentialRampToValueAtTime(0.001, cur + item.d + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(cur);
        osc.stop(cur + item.d + 0.06);
        cur += item.d;
      });
    });
  }

  // Rapid mechanical tick for wheel spinning / lottery roll
  public playTick() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    });
  }

  // Cheerful Stardew Valley bell alarm for timer completion
  public playAlarm() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const notes = [587.33, 783.99, 880, 1174.66, 1046.5];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.51);
      });
    });
  }

  // Dramatic drumroll / suspense rumble for random student picking
  public playDrumRoll() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);

      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.085);
    });
  }

  // Special 16-bit shimmering achievement chime when unlocking a 50-point Farm Master badge
  public playAchievementUnlock() {
    this.withAudio((ctx) => {
      const now = ctx.currentTime;
      // Ascending golden Stardew fanfare: C5 -> E5 -> G5 -> B5 -> C6 -> E6 -> G6 chord
      const arpeggio = [
        { freq: 523.25, delay: 0.0, dur: 0.22, vol: 0.2 },
        { freq: 659.25, delay: 0.065, dur: 0.22, vol: 0.2 },
        { freq: 783.99, delay: 0.13, dur: 0.24, vol: 0.21 },
        { freq: 987.77, delay: 0.195, dur: 0.24, vol: 0.2 },
        { freq: 1046.5, delay: 0.26, dur: 0.36, vol: 0.24 },
        { freq: 1318.51, delay: 0.34, dur: 0.42, vol: 0.22 },
        { freq: 1567.98, delay: 0.42, dur: 0.65, vol: 0.24 },
      ];

      arpeggio.forEach((n) => {
        const t = now + n.delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(n.vol, t + 0.014);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + n.dur + 0.02);
      });

      // Shimmering high crystal octave finish
      const shimmerNotes = [2093.0, 2637.02];
      shimmerNotes.forEach((freq, idx) => {
        const t = now + 0.42 + idx * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.11, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.72);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.75);
      });
    });
  }

  // Deducting points / warning buzzer
  public playBuzzer() {
    this.playPointDeduct();
  }
}

export const soundManager = new SoundManager();
