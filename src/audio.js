// Web Audio API Music Box & Sound Effects (Zero external audio assets required)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.8, timeOffset = 0, volume = 0.1) {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime + timeOffset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Music box bell sound (sine wave with soft harmonic)
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  // Sweet chime sounds
  playSparkle() {
    this.init();
    if (!this.ctx) return;
    const notes = [880, 1108.73, 1318.51, 1760];
    notes.forEach((freq, i) => {
      this.playTone(freq, 0.4, i * 0.05, 0.06);
    });
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    this.playTone(587.33, 0.12, 0, 0.12);
    this.playTone(880, 0.2, 0.04, 0.09);
  }

  playBlowCandle() {
    this.init();
    if (!this.ctx) return;
    // Whoosh / triumphant celebration chime
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, i) => {
      this.playTone(freq, 1.2, i * 0.08, 0.08);
      this.playTone(freq * 1.5, 0.8, i * 0.08 + 0.02, 0.03);
    });
  }

  // Realistic celebration firework launch & pop
  playFirework() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
      // Sparkle chime after burst
      setTimeout(() => {
        this.playTone(1000 + Math.random() * 600, 0.15, 0, 0.04);
      }, 60);
    } catch (e) {}
  }

  // Play recurring sweet music box rendition of Happy Birthday
  toggleBgm(onStateChange) {
    this.init();
    if (this.isPlaying) {
      this.stopBgm();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.isPlaying = true;
      this.startMelodyLoop();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  stopBgm() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  startMelodyLoop() {
    if (!this.isPlaying || !this.ctx) return;

    // Frequencies (Hz)
    const G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25,
          D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;

    const melody = [
      { f: G4, d: 0.35, t: 0 },
      { f: G4, d: 0.35, t: 0.4 },
      { f: A4, d: 0.7, t: 0.8 },
      { f: G4, d: 0.7, t: 1.6 },
      { f: C5, d: 0.7, t: 2.4 },
      { f: B4, d: 1.2, t: 3.2 },

      { f: G4, d: 0.35, t: 4.8 },
      { f: G4, d: 0.35, t: 5.2 },
      { f: A4, d: 0.7, t: 5.6 },
      { f: G4, d: 0.7, t: 6.4 },
      { f: D5, d: 0.7, t: 7.2 },
      { f: C5, d: 1.2, t: 8.0 },

      { f: G4, d: 0.35, t: 9.6 },
      { f: G4, d: 0.35, t: 10.0 },
      { f: G5, d: 0.7, t: 10.4 },
      { f: E5, d: 0.7, t: 11.2 },
      { f: C5, d: 0.7, t: 12.0 },
      { f: B4, d: 0.7, t: 12.8 },
      { f: A4, d: 1.2, t: 13.6 },

      { f: F5, d: 0.35, t: 15.2 },
      { f: F5, d: 0.35, t: 15.6 },
      { f: E5, d: 0.7, t: 16.0 },
      { f: C5, d: 0.7, t: 16.8 },
      { f: D5, d: 0.7, t: 17.6 },
      { f: C5, d: 1.8, t: 18.4 }
    ];

    melody.forEach((note) => {
      this.playTone(note.f, note.d * 1.4, note.t * 0.75, 0.08);
      // Gentle soft music-box shimmer overtone
      this.playTone(note.f * 2, note.d * 0.7, note.t * 0.75 + 0.015, 0.025);
    });

    // Schedule next loop (approx 15 seconds)
    this.timer = setTimeout(() => {
      if (this.isPlaying) this.startMelodyLoop();
    }, 15000);
  }
}

export const sound = new SoundEngine();
