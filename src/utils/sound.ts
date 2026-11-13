// Web Audio API Retro Sound & Background Music Synthesizer for Stardew Valley English Adventure

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private currentStep: number = 0;
  private bgmGainNode: GainNode | null = null;

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
    } catch {
      // ignore storage errors
    }

    // Unlock Web Audio Context early on first user interaction (Windows/Chrome/iframe safe)
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.initCtx();
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
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
        this.ctx.resume().catch(() => {});
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
    } else if (this.isMusicPlaying) {
      this.startMusic();
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

  // Deducting points / warning buzzer
  public playBuzzer() {
    this.playPointDeduct();
  }
}

export const soundManager = new SoundManager();
