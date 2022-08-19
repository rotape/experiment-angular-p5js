import { Params } from "../models/interfaces";
import { CONFIG } from "./config";

var PERIOD = Math.PI * 2;
var PERIOD_HALF = PERIOD / 2;
var PERIOD_RECIP = 1 / PERIOD;
var LFO_SAMPLE_PERIOD = CONFIG.lfoSamplePeriod;
var LFO_FREQUENCY_TABLE = [
  // see https://github.com/smbolton/hexter/tree/master/src/dx7_voice.c#L1002
  0.062506, 0.124815, 0.311474, 0.435381, 0.619784, 0.744396, 0.930495, 1.11639,
  1.28422, 1.49688, 1.56783, 1.738994, 1.910158, 2.081322, 2.252486, 2.42365,
  2.580668, 2.737686, 2.894704, 3.051722, 3.20874, 3.36682, 3.5249, 3.68298,
  3.84106, 3.99914, 4.15942, 4.3197, 4.47998, 4.64026, 4.80054, 4.953584,
  5.106628, 5.259672, 5.412716, 5.56576, 5.724918, 5.884076, 6.043234, 6.202392,
  6.36155, 6.520044, 6.678538, 6.837032, 6.995526, 7.15402, 7.3005, 7.44698,
  7.59346, 7.73994, 7.88642, 8.020588, 8.154756, 8.288924, 8.423092, 8.55726,
  8.712624, 8.867988, 9.023352, 9.178716, 9.33408, 9.669644, 10.005208,
  10.340772, 10.676336, 11.0119, 11.96368, 12.91546, 13.86724, 14.81902,
  15.7708, 16.64024, 17.50968, 18.37912, 19.24856, 20.118, 21.0407, 21.9634,
  22.8861, 23.8088, 24.7315, 25.75974, 26.78798, 27.81622, 28.84446, 29.8727,
  31.2282, 32.5837, 33.9392, 35.2947, 36.6502, 37.81248, 38.97476, 40.13704,
  41.29932, 42.4616, 43.6398, 44.818, 45.9962, 47.1744, 47.1744, 47.1744,
  47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744,
  47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744,
  47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744, 47.1744,
  47.1744, 47.1744,
];
var LFO_AMP_MOD_TABLE = [
  // TODO: use lfo amp mod table
  0.0, 0.00793, 0.00828, 0.00864, 0.00902, 0.00941, 0.00982, 0.01025, 0.0107,
  0.01117, 0.01166, 0.01217, 0.01271, 0.01327, 0.01385, 0.01445, 0.01509,
  0.01575, 0.01644, 0.01716, 0.01791, 0.0187, 0.01952, 0.02037, 0.02126, 0.0222,
  0.02317, 0.02418, 0.02524, 0.02635, 0.02751, 0.02871, 0.02997, 0.03128,
  0.03266, 0.03409, 0.03558, 0.03714, 0.03877, 0.04047, 0.04224, 0.04409,
  0.04603, 0.04804, 0.05015, 0.05235, 0.05464, 0.05704, 0.05954, 0.06215,
  0.06487, 0.06772, 0.07068, 0.07378, 0.07702, 0.08039, 0.08392, 0.08759,
  0.09143, 0.09544, 0.09962, 0.10399, 0.10855, 0.11331, 0.11827, 0.12346,
  0.12887, 0.13452, 0.14041, 0.14657, 0.15299, 0.1597, 0.1667, 0.17401, 0.18163,
  0.1896, 0.19791, 0.20658, 0.21564, 0.22509, 0.23495, 0.24525, 0.256, 0.26722,
  0.27894, 0.29116, 0.30393, 0.31725, 0.33115, 0.34567, 0.36082, 0.37664,
  0.39315, 0.41038, 0.42837, 0.44714, 0.46674, 0.4872, 0.50856, 0.53283,
];
var LFO_PITCH_MOD_TABLE = [
  0, 0.0264, 0.0534, 0.0889, 0.1612, 0.2769, 0.4967, 1,
];
var LFO_MODE_TRIANGLE = 0,
  LFO_MODE_SAW_DOWN = 1,
  LFO_MODE_SAW_UP = 2,
  LFO_MODE_SQUARE = 3,
  LFO_MODE_SINE = 4,
  LFO_MODE_SAMPLE_HOLD = 5;

var LFO_DELAY_ONSET = 0,
  LFO_DELAY_RAMP = 1,
  LFO_DELAY_COMPLETE = 2;

// Private static variables
var phaseStep = 0;
var pitchModDepth = 0;
var ampModDepth = 0;
var sampleHoldRandom = 0;
var delayTimes = [0, 0, 0];
var delayIncrements = [0, 0, 0];
var delayVals = [0, 0, 1];
var params: Params;

export function LfoDX7(opParams) {
  this.opParams = opParams;
  this.phase = 0;
  this.pitchVal = 0;
  this.counter = 0;
  this.ampVal = 1;
  this.ampValTarget = 1;
  this.ampIncrement = 0;
  this.delayVal = 0;
  this.delayState = LFO_DELAY_ONSET;
  LfoDX7.update();
}

LfoDX7.prototype.render = function () {
  var amp;
  if (this.counter % LFO_SAMPLE_PERIOD === 0) {
    switch (params.lfoWaveform) {
      case LFO_MODE_TRIANGLE:
        if (this.phase < PERIOD_HALF) amp = 4 * this.phase * PERIOD_RECIP - 1;
        else amp = 3 - 4 * this.phase * PERIOD_RECIP;
        break;
      case LFO_MODE_SAW_DOWN:
        amp = 1 - 2 * this.phase * PERIOD_RECIP;
        break;
      case LFO_MODE_SAW_UP:
        amp = 2 * this.phase * PERIOD_RECIP - 1;
        break;
      case LFO_MODE_SQUARE:
        amp = this.phase < PERIOD_HALF ? -1 : 1;
        break;
      case LFO_MODE_SINE:
        amp = Math.sin(this.phase);
        break;
      case LFO_MODE_SAMPLE_HOLD:
        amp = sampleHoldRandom;
        break;
    }

    switch (this.delayState) {
      case LFO_DELAY_ONSET:
      case LFO_DELAY_RAMP:
        this.delayVal += delayIncrements[this.delayState];
        if (this.counter / LFO_SAMPLE_PERIOD > delayTimes[this.delayState]) {
          this.delayState++;
          this.delayVal = delayVals[this.delayState];
        }
        break;
      case LFO_DELAY_COMPLETE:
        break;
    }

    // if (this.counter % 10000 == 0 && this.operatorIndex === 0) console.log("lfo amp value", this.ampVal);
    amp *= this.delayVal;
    pitchModDepth =
      1 +
      LFO_PITCH_MOD_TABLE[params.lfoPitchModSens] *
        (params.controllerModVal + params.lfoPitchModDepth / 99);
    this.pitchVal = Math.pow(pitchModDepth, amp);
    // TODO: Simplify ampValTarget calculation.
    // ampValTarget range = 0 to 1. lfoAmpModSens range = -3 to 3. ampModDepth range =  0 to 1. amp range = -1 to 1.
    var ampSensDepth = Math.abs(this.opParams.lfoAmpModSens) * 0.333333;
    var phase = this.opParams.lfoAmpModSens > 0 ? 1 : -1;
    this.ampValTarget =
      1 -
      (ampModDepth + params.controllerModVal) *
        ampSensDepth *
        (amp * phase + 1) *
        0.5;
    this.ampIncrement = (this.ampValTarget - this.ampVal) / LFO_SAMPLE_PERIOD;
    this.phase += phaseStep;
    if (this.phase >= PERIOD) {
      sampleHoldRandom = 1 - Math.random() * 2;
      this.phase -= PERIOD;
    }
  }
  this.counter++;
  return this.pitchVal;
};

LfoDX7.prototype.renderAmp = function () {
  this.ampVal += this.ampIncrement;
  return this.ampVal;
};

LfoDX7.setParams = function (globalParams) {
  params = globalParams;
};

LfoDX7.update = function () {
  var frequency = LFO_FREQUENCY_TABLE[params.lfoSpeed];
  var lfoRate = CONFIG.sampleRate / LFO_SAMPLE_PERIOD;
  phaseStep = (PERIOD * frequency) / lfoRate; // radians per sample
  ampModDepth = params.lfoAmpModDepth * 0.01;
  // ignoring amp mod table for now. it seems shallow LFO_AMP_MOD_TABLE[params.lfoAmpModDepth];
  delayTimes[LFO_DELAY_ONSET] =
    (lfoRate * 0.001753 * Math.pow(params.lfoDelay, 3.10454) + 169.344 - 168) /
    1000;
  delayTimes[LFO_DELAY_RAMP] =
    (lfoRate * 0.321877 * Math.pow(params.lfoDelay, 2.01163) + 494.201 - 168) /
    1000;
  delayIncrements[LFO_DELAY_RAMP] =
    1 / (delayTimes[LFO_DELAY_RAMP] - delayTimes[LFO_DELAY_ONSET]);
};

// module.exports = LfoDX7;
