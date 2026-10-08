// Comprehensive Zero-Dependency Web Audio API Soundscape Engine for Astra
// Generates authentic ambient zones (Forest, Cave, Mountain, Ruins, City, Citadel) + UI sound FX

class AncientSoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.6;
    this.currentZone = 'forest';
    this.activeNodes = [];
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient Bus
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // SFX Bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.isInitialized = true;
      this.startZoneAmbiance(this.currentZone);
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  stopActiveAmbiance() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (_) {}
    });
    this.activeNodes = [];
  }

  // Set Current World Environment Zone: 'forest' | 'cave' | 'mountain' | 'ruins' | 'city' | 'citadel'
  setZone(zoneName) {
    if (zoneName === this.currentZone && this.activeNodes.length > 0) return;
    this.currentZone = zoneName;
    if (!this.ctx || this.isMuted) return;
    this.startZoneAmbiance(zoneName);
  }

  startZoneAmbiance(zoneName) {
    if (!this.ctx) return;
    this.stopActiveAmbiance();

    const t = this.ctx.currentTime;

    if (zoneName === 'forest') {
      // Gentle wind filter + singing harmonics
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(74, t); // Sub-bass wind
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);
      gain.gain.setValueAtTime(0.2, t);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.activeNodes.push(osc, filter, gain);

      // Procedural bird song periodic trigger
      this.scheduleProceduralBird();

    } else if (zoneName === 'cave') {
      // Subterranean hollow reverb & low cavern hum
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, t);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(140, t);
      filter.Q.setValueAtTime(3, t);
      gain.gain.setValueAtTime(0.3, t);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.activeNodes.push(osc, filter, gain);

      // Water droplet trigger
      this.scheduleWaterDroplet();

    } else if (zoneName === 'mountain') {
      // Alpine high altitude gusting wind
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, t);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, t);
      filter.Q.setValueAtTime(1.5, t);
      gain.gain.setValueAtTime(0.18, t);

      // LFO for gusting effect
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, t);
      lfoGain.gain.setValueAtTime(250, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.activeNodes.push(osc, filter, gain, lfo, lfoGain);

    } else if (zoneName === 'ruins' || zoneName === 'city') {
      // Crackling brazier fire + warm golden harmonic drone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, t); // Sacred 108Hz harmonic
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(216, t);
      gain.gain.setValueAtTime(0.22, t);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ambientGain);
      osc1.start();
      osc2.start();
      this.activeNodes.push(osc1, osc2, gain);

    } else if (zoneName === 'citadel') {
      // Majestic celestial citadel: deep tanpura/drone resonance + crystalline harmonic
      const root = this.ctx.createOscillator();
      const fifth = this.ctx.createOscillator();
      const high = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      root.type = 'sawtooth';
      root.frequency.setValueAtTime(65.4, t); // C2
      fifth.type = 'sine';
      fifth.frequency.setValueAtTime(98.0, t); // G2
      high.type = 'sine';
      high.frequency.setValueAtTime(261.6, t); // C4

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, t);

      gain.gain.setValueAtTime(0.25, t);

      root.connect(filter);
      fifth.connect(filter);
      high.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      root.start();
      fifth.start();
      high.start();
      this.activeNodes.push(root, fifth, high, filter, gain);
    }
  }

  scheduleProceduralBird() {
    if (this.currentZone !== 'forest' || !this.ctx || this.isMuted) return;
    const delay = Math.random() * 5000 + 4000;
    setTimeout(() => {
      if (this.currentZone === 'forest') {
        this.playBirdChirp();
        this.scheduleProceduralBird();
      }
    }, delay);
  }

  scheduleWaterDroplet() {
    if (this.currentZone !== 'cave' || !this.ctx || this.isMuted) return;
    const delay = Math.random() * 4000 + 2500;
    setTimeout(() => {
      if (this.currentZone === 'cave') {
        this.playWaterDrip();
        this.scheduleWaterDroplet();
      }
    }, delay);
  }

  // --- Sound Effects ---

  playBirdChirp() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(3400, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(2400, t + 0.16);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  playWaterDrip() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.15);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Ancient Shankha (Conch Horn) Fanfare for Gate Opening / Qualification
  playShankhaFanfare() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    const notes = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25]; // Sacred Pentatonic
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + idx * 0.14);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t + idx * 0.14);
      filter.frequency.linearRampToValueAtTime(1800, t + idx * 0.14 + 0.4);

      gain.gain.setValueAtTime(0.001, t + idx * 0.14);
      gain.gain.linearRampToValueAtTime(0.25, t + idx * 0.14 + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.14 + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t + idx * 0.14);
      osc.stop(t + idx * 0.14 + 1.9);
    });
  }

  // Deep Cinematic Impact / Stone Door Rumble
  playStoneImpact() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(28, t + 1.2);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 1.5);
  }

  // Stone carving click / ancient tablet select
  playStoneClick() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.06);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Ancient Temple Bell Chime
  playTempleBell() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    const freqs = [523.25, 1046.5, 1567.98];
    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 2.5);
    });
  }

  // Realistic organic footstep sound on soil, gravel, and dry leaves
  playFootstep() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    try {
      // 1. Low earthen ground thud
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(55 + Math.random() * 25, t);
      osc.frequency.exponentialRampToValueAtTime(24, t + 0.08);

      oscGain.gain.setValueAtTime(0.045, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.085);

      osc.connect(oscGain);
      oscGain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.09);

      // 2. Leaf and pebble crunch noise
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750 + Math.random() * 350, t);
      filter.Q.setValueAtTime(1.8, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.03, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      whiteNoise.start(t);
    } catch (_) {}
  }
}

export const ancientSoundscape = new AncientSoundscapeEngine();
