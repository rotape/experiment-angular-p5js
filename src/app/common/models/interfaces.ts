export interface Note {
  closingFreq: number;
  closingFreqOctave: number;
  closingNote: string;
  closingOctave: number;
  keyCode: number;
  openingFreq: number;
  openingFreqOctave: number;
  openingNote: string;
  openingOctave: number;
}

export interface Config {
  sampleRate: number; // gets updated with audio context rate
  lfoSamplePeriod: number;
  bufferSize: number;
  polyphony: number;
}

export interface Params {
  lfoWaveform: LfoWaveform;
  lfoPitchModSens: number;
  controllerModVal: number;
  lfoPitchModDepth: number;
  lfoAmpModDepth: number;
  lfoSpeed: number;
  lfoDelay: number;
}

export interface Operator {
  rates;
  levels;
  keyScaleBreakpoint;
  keyScaleDepthL;
  keyScaleDepthR;
  keyScaleCurveL;
  keyScaleCurveR;
  keyScaleRate;
  detune;
  lfoAmpModSens;
  velocitySens;
  volume;
  oscMode;
  freqCoarse;
  freqFine;
  pan;
  idx;
  enabled;
}

export enum LfoWaveform {
  LFO_MODE_TRIANGLE,
  LFO_MODE_SAW_DOWN,
  LFO_MODE_SAW_UP,
  LFO_MODE_SQUARE,
  LFO_MODE_SINE,
  LFO_MODE_SAMPLE_HOLD,
}
