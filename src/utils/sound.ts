// Web Audio API Retro Sound & Background Music Synthesizer for Stardew Valley English Adventure

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private currentStep: number = 0;
  private bgmGainNode: GainNode | null = null;

  constructor() {
    const savedMute = localStorage.getItem('stardew_sound_muted');
    if (savedMute) {
      this.isMuted = savedMute === 'true';
    }
    const savedMusic = localStorage.getItem('stardew_bgm_enabled');
    // Default to true for cozy farm music unless disabled
    this.isMusicPlaying = savedMusic !== 'false';
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('stardew_sound_muted', String(this.isMuted));
    if (this.isMuted) {
      this.pauseMusic();
    } else if (this.isMusicPlaying) {
      this.startMusic();
    }
    return this.isMuted;
  }

  public toggleMusic(): boolean {
    this.isMusicPlaying = !this.isMusicPlaying;
    localStorage.setItem('stardew_bgm_enabled', String(this.isMusicPlaying));
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
    localStorage.setItem('stardew_bgm_enabled', 'true');

    // Melody and Bass Arpeggio Sequence (C - G - Am - F)
    // 32-step cycle in 4/4 time
    const sequence = [
      // Bar 1: C Major (C4, E4, G4, C5)
      { lead: 523.25, bass: 261.63 }, // C5, C4
      { lead: 0,      bass: 329.63 }, // E4
      { lead: 659.25, bass: 392.00 }, // E5, G4
      { lead: 523.25, bass: 523.25 }, // C5, C5
      { lead: 783.99, bass: 392.00 }, // G5
      { lead: 659.25, bass: 329.63 }, // E5
      { lead: 523.25, bass: 261.63 }, // C5
      { lead: 587.33, bass: 329.63 }, // D5

      // Bar 2: G Major (B4, D5, G5)
      { lead: 392.00, bass: 196.00 }, // G4, G3
      { lead: 0,      bass: 246.94 }, // B3
      { lead: 587.33, bass: 293.66 }, // D5, D4
      { lead: 493.88, bass: 392.00 }, // B4, G4
      { lead: 587.33, bass: 293.66 }, // D5
      { lead: 659.25, bass: 246.94 }, // E5
      { lead: 587.33, bass: 196.00 }, // D5
      { lead: 493.88, bass: 293.66 }, // B4

      // Bar 3: A Minor (A4, C5, E5)
      { lead: 440.00, bass: 220.00 }, // A4, A3
      { lead: 0,      bass: 261.63 }, // C4
      { lead: 523.25, bass: 329.63 }, // C5, E4
      { lead: 659.25, bass: 440.00 }, // E5, A4
      { lead: 523.25, bass: 329.63 }, // C5
      { lead: 440.00, bass: 261.63 }, // A4
      { lead: 523.25, bass: 220.00 }, // C5
      { lead: 659.25, bass: 329.63 }, // E5

      // Bar 4: F Major (F4, A4, C5)
      { lead: 698.46, bass: 174.61 }, // F5, F3
      { lead: 0,      bass: 220.00 }, // A3
      { lead: 659.25, bass: 261.63 }, // E5, C4
      { lead: 587.33, bass: 349.23 }, // D5, F4
      { lead: 523.25, bass: 261.63 }, // C5
      { lead: 440.00, bass: 220.00 }, // A4
      { lead: 493.88, bass: 261.63 }, // B4
      { lead: 523.25, bass: 349.23 }, // C5
    ];

    const stepDurationMs = 280; // ~107 bpm
    this.currentStep = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying || this.isMuted || !this.ctx) return;
      const note = sequence[this.currentStep % sequence.length];
      const now = this.ctx.currentTime;

      // Play soft bass/chime arpeggio
      if (note.bass > 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(note.bass, now);

        bassGain.gain.setValueAtTime(0.045, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.35);
      }

      // Play warm whistle/flute melody
      if (note.lead > 0) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(note.lead, now);

        leadGain.gain.setValueAtTime(0.065, now);
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
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio policy catch
    }
  }

  // Cheerful correct chime
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.16, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch {
      // Catch
    }
  }

  // Gentle low wobble for mistakes (encouraging, not harsh)
  public playIncorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Catch
    }
  }

  // Sparkly coin or gem pickup
  public playCollect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Catch
    }
  }

  // Victory fanfare for level completion
  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.25 },
        { f: 880.00, d: 0.12 },
        { f: 1046.5, d: 0.40 },
      ];
      let cur = this.ctx.currentTime;
      melody.forEach((item) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, cur);

        gain.gain.setValueAtTime(0.2, cur);
        gain.gain.exponentialRampToValueAtTime(0.001, cur + item.d + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(cur);
        osc.stop(cur + item.d + 0.05);
        cur += item.d;
      });
    } catch {
      // Catch
    }
  }

  // Rapid mechanical tick for wheel spinning / lottery roll
  public playTick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {
      // Catch
    }
  }

  // Cheerful Stardew Valley bell alarm for timer completion
  public playAlarm() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [587.33, 783.99, 880, 1174.66, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);

        gain.gain.setValueAtTime(0.22, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.5);
      });
    } catch {
      // Catch
    }
  }

  // Dramatic drumroll / suspense rumble for random student picking
  public playDrumRoll() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Catch
    }
  }

  // Deducting points / warning buzzer
  public playBuzzer() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.setValueAtTime(130, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {
      // Catch
    }
  }
}

export const soundManager = new SoundManager();
