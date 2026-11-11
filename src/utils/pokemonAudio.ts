/**
 * Web Audio API synthesizer matching the original Miss Iong's Pokémon Class Points Manager
 */

class PokemonSoundSynthesizer {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem('pokemon_sound_muted') || localStorage.getItem('stardew_sound_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    } catch {}
  }

  public init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext not supported or permission denied
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('pokemon_sound_muted', String(muted));
      localStorage.setItem('stardew_sound_muted', String(muted));
    } catch {}
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('pokemon_sound_muted', String(this.isMuted));
      localStorage.setItem('stardew_sound_muted', String(this.isMuted));
    } catch {}
    return this.isMuted;
  }

  public playPointUp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880, 1174.66, 1479.98, 1760];
      const step = 0.045;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * step);
        gain.gain.setValueAtTime(0.001, now + idx * step);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * step + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * step + 0.52);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * step);
        osc.stop(now + idx * step + 0.53);

        // Harmonic shimmer
        const oscH = this.ctx.createOscillator();
        const gainH = this.ctx.createGain();
        oscH.type = 'sine';
        oscH.frequency.setValueAtTime(freq * 2, now + idx * step);
        gainH.gain.setValueAtTime(0.001, now + idx * step);
        gainH.gain.linearRampToValueAtTime(0.04, now + idx * step + 0.01);
        gainH.gain.exponentialRampToValueAtTime(0.0001, now + idx * step + 0.25);

        oscH.connect(gainH);
        gainH.connect(this.ctx.destination);
        oscH.start(now + idx * step);
        oscH.stop(now + idx * step + 0.26);
      });
    } catch {
      // Audio playback failed
    }
  }

  public playPointDown() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [783.99, 659.25, 523.25];
      const step = 0.085;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * step);
        gain.gain.setValueAtTime(0.001, now + idx * step);
        gain.gain.linearRampToValueAtTime(0.35, now + idx * step + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * step + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * step);
        osc.stop(now + idx * step + 0.33);

        const oscSub = this.ctx.createOscillator();
        const gainSub = this.ctx.createGain();
        oscSub.type = 'sawtooth';
        oscSub.frequency.setValueAtTime(freq / 2, now + idx * step);
        gainSub.gain.setValueAtTime(0.001, now + idx * step);
        gainSub.gain.linearRampToValueAtTime(0.06, now + idx * step + 0.008);
        gainSub.gain.exponentialRampToValueAtTime(0.0001, now + idx * step + 0.18);

        oscSub.connect(gainSub);
        gainSub.connect(this.ctx.destination);
        oscSub.start(now + idx * step);
        oscSub.stop(now + idx * step + 0.19);
      });
    } catch {
      // Audio failed
    }
  }

  public playShuffleTick(index: number, total: number) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = 440 + (index / Math.max(1, total)) * 440;

      osc.frequency.setValueAtTime(freq, now);
      osc.type = 'square';
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.05);
    } catch {}
  }

  public playShuffleSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.3);
    } catch {}
  }

  public playTimerClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.035);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  public playTimerAlarm() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [0, 0.2, 0.4, 0.6].forEach((offset) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1046.5, now + offset); // C6
        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.15);
      });
    } catch {}
  }

  public playCoolingOff() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [880, 1046.5, 1318.51, 1567.98];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.001, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.42);
      });
    } catch {}
  }

  public playClapping() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      for (let t = 0; t < 8; t++) {
        const time = now + t * 0.12;
        const sampleCount = Math.floor(this.ctx.sampleRate * 0.1);
        const buffer = this.ctx.createBuffer(1, sampleCount, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < sampleCount; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, time);
        filter.Q.setValueAtTime(1, time);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.3, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        source.start(time);
        source.stop(time + 0.1);
      }
    } catch {}
  }
}

export const pokemonSound = new PokemonSoundSynthesizer();
