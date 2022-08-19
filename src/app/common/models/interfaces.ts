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

export interface PresetParams {
  name?: any;
  feedback(feedback: any);
  operators?: any;
  presets?: any;
}

export interface Operator {
  idx?: number;
  enabled?: true;
  rates?: number[];
  levels?: number[];
  detune?: number;
  velocitySens?: number;
  lfoAmpModSens?: number;
  volume?: number;
  oscMode?: number;
  freqCoarse?: number;
  freqFine?: number;
  pan?: number;
  outputLevel?: number;
  keyScaleBreakpoint?;
  keyScaleDepthL?;
  keyScaleDepthR?;
  keyScaleCurveL?;
  keyScaleCurveR?;
  keyScaleRate?;
}
export interface PitchEnvelope {
  rates: number[];
  levels: number[];
}
export interface Preset {
  name: string;
  algorithm: number;
  feedback: number;
  lfoSpeed: number;
  lfoDelay: number;
  lfoPitchModDepth: number;
  lfoAmpModDepth: number;
  lfoPitchModSens: number;
  lfoWaveform: number;
  lfoSync: number;
  pitchEnvelope: PitchEnvelope;
  controllerModVal: number;
  aftertouchEnabled: number;

  operators: Operator[];
}

export enum LfoWaveform {
  LFO_MODE_TRIANGLE,
  LFO_MODE_SAW_DOWN,
  LFO_MODE_SAW_UP,
  LFO_MODE_SQUARE,
  LFO_MODE_SINE,
  LFO_MODE_SAMPLE_HOLD,
}
