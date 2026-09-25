/**
 * Web Audio API synthesizer for study atmosphere background soundscapes.
 * Works offline, no external audio assets required.
 */

class SoundscapesManager {
  private ctx: AudioContext | null = null;
  private currentType: string = 'none';
  private nodes: (AudioNode | number)[] = [];
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public stop() {
    this.nodes.forEach((n) => {
      if (typeof n === 'number') {
        window.clearInterval(n);
      } else {
        try {
          (n as AudioScheduledSourceNode).stop?.();
          n.disconnect();
        } catch {
          // ignore disconnect errors
        }
      }
    });
    this.nodes = [];
    this.currentType = 'none';
  }

  public play(type: 'rain' | 'library' | 'binaural') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.currentType === type) {
      this.stop();
      return;
    }

    this.stop();
    this.currentType = type;

    if (type === 'rain') {
      this.createRainSound();
    } else if (type === 'binaural') {
      this.createBinauralSound();
    } else if (type === 'library') {
      this.createLibrarySound();
    }
  }

  private createRainSound() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise approximation for soothing rain
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to sound like soft rainfall on window
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(0);
    this.nodes.push(whiteNoise, filter, gain);
  }

  private createBinauralSound() {
    if (!this.ctx || !this.masterGain) return;
    // 40Hz Gamma waves for peak cognition: Left 200Hz, Right 240Hz
    const merger = this.ctx.createChannelMerger(2);

    const oscL = this.ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(200, this.ctx.currentTime);

    const oscR = this.ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(240, this.ctx.currentTime);

    const gainL = this.ctx.createGain();
    gainL.gain.setValueAtTime(0.18, this.ctx.currentTime);
    const gainR = this.ctx.createGain();
    gainR.gain.setValueAtTime(0.18, this.ctx.currentTime);

    oscL.connect(gainL);
    oscR.connect(gainR);

    gainL.connect(merger, 0, 0);
    gainR.connect(merger, 0, 1);

    // Warm sub-bass undertone
    const warmSub = this.ctx.createOscillator();
    warmSub.type = 'sine';
    warmSub.frequency.setValueAtTime(100, this.ctx.currentTime);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    warmSub.connect(subGain);
    subGain.connect(this.masterGain);

    merger.connect(this.masterGain);

    oscL.start();
    oscR.start();
    warmSub.start();

    this.nodes.push(oscL, oscR, warmSub, gainL, gainR, subGain, merger);
  }

  private createLibrarySound() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Brown noise for deep warm hum of a quiet study hall
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 0.35;
    }

    const brownNoise = this.ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    brownNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    brownNoise.start(0);
    this.nodes.push(brownNoise, filter, gain);
  }

  public getCurrent(): string {
    return this.currentType;
  }
}

export const soundscapes = new SoundscapesManager();
