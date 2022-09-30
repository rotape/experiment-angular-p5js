import { Note } from "./interfaces";

// export let musicalObject = [
//   { key: 81, octave_3: 98, octave_4: 103.83 },
//   { key: 87, octave_3: 116.54, octave_4: 123.47 },
//   { key: 69, octave_3: 138.59, octave_4: 146.83 },
//   { key: 82, octave_3: 164.81, octave_4: 174.61 },
//   { key: 84, octave_3: 2 * 98, octave_4: 2 * 103.83 },
//   { key: 89, octave_3: 2 * 116.54, octave_4: 2 * 123.47 },
//   { key: 85, octave_3: 2 * 138.59, octave_4: 2 * 146.83 },
//   { key: 73, octave_3: 2 * 164.81, octave_4: 2 * 174.61 },
//   { key: 79, octave_3: 2 * 98, octave_4: 4 * 103.83 },
//   { key: 80, octave_3: 4 * 116.54, octave_4: 4 * 123.47 },
//   { key: 219, octave_3: 4 * 138.59, octave_4: 4 * 146.83 },
//   { key: 221, octave_3: 4 * 164.81, octave_4: 4 * 174.61 },
//   { key: 65, octave_3: 87.31, octave_4: 92.5 },
//   { key: 83, octave_3: 103.83, octave_4: 110 },
//   { key: 68, octave_3: 123.47, octave_4: 130.81 },
//   { key: 70, octave_3: 146.83, octave_4: 155.56 },
//   { key: 71, octave_3: 2 * 87.31, octave_4: 2 * 92.5 },
//   { key: 72, octave_3: 2 * 103.83, octave_4: 2 * 110 },
//   { key: 74, octave_3: 2 * 123.47, octave_4: 2 * 130.81 },
//   { key: 75, octave_3: 2 * 146.83, octave_4: 2 * 155.56 },
//   { key: 76, octave_3: 4 * 87.31, octave_4: 4 * 92.5 },
//   { key: 186, octave_3: 4 * 103.83, octave_4: 4 * 110 },
//   { key: 192, octave_3: 4 * 123.47, octave_4: 4 * 130.81 },
//   { key: 222, octave_3: 4 * 146.83, octave_4: 4 * 155.56 },
//   { key: 90, octave_3: 77.78, octave_4: 82.41 },
//   { key: 88, octave_3: 92.5, octave_4: 98 },
//   { key: 67, octave_3: 110, octave_4: 116.54 },
//   { key: 86, octave_3: 130.81, octave_4: 138.59 },
//   { key: 66, octave_3: 2 * 77.78, octave_4: 2 * 82.41 },
//   { key: 78, octave_3: 2 * 92.5, octave_4: 2 * 98 },
//   { key: 77, octave_3: 2 * 110, octave_4: 2 * 116.54 },
//   { key: 188, octave_3: 2 * 130.81, octave_4: 2 * 138.59 },
//   { key: 190, octave_3: 4 * 77.78, octave_4: 4 * 82.41 },
//   { key: 191, octave_3: 4 * 92.5, octave_4: 4 * 98 },
//   { key: 192, octave_3: 4 * 110, octave_4: 4 * 116.54 },
//   { key: 193, octave_3: 4 * 130.81, octave_4: 4 * 138.59 },
// ];

// export let musicalObject2 = {
//   81: { key: 87, octave_3: 493.88, octave_4: 466.16 },
//   87: { key: 69, octave_3: 587.33, octave_4: 554.36 },
//   69: { key: 82, octave_3: 698.45, octave_4: 659.25 },
//   82: { key: 84, octave_3: 830.61, octave_4: 783.99 },
//   84: { key: 89, octave_3: 987.76, octave_4: 932.33 },
//   89: { key: 85, octave_3: 1174.66, octave_4: 1108.73 },
//   85: { key: 73, octave_3: 1396.91, octave_4: 1318.51 },
//   73: { key: 79, octave_3: 1661.22, octave_4: 1567.98 },
//   79: { key: 80, octave_3: 1978.53, octave_4: 1864.65 },
//   80: { key: 219, octave_3: 2349.3, octave_4: 2217.44 },
//   219: { key: 221, octave_3: 2793.84, octave_4: 2637.04 },
//   221: { key: 221, octave_3: 4 * 164.81, octave_4: 4 * 174.61 },
//   65: { key: 65, octave_3: 87.31, octave_4: 92.5 },
//   83: { key: 83, octave_3: 103.83, octave_4: 110 },
//   68: { key: 68, octave_3: 123.47, octave_4: 130.81 },
//   70: { key: 70, octave_3: 146.83, octave_4: 155.56 },
//   71: { key: 71, octave_3: 2 * 87.31, octave_4: 2 * 92.5 },
//   72: { key: 72, octave_3: 2 * 103.83, octave_4: 2 * 110 },
//   74: { key: 74, octave_3: 2 * 123.47, octave_4: 2 * 130.81 },
//   75: { key: 75, octave_3: 2 * 146.83, octave_4: 2 * 155.56 },
//   76: { key: 76, octave_3: 4 * 87.31, octave_4: 4 * 92.5 },
//   186: { key: 186, octave_3: 4 * 103.83, octave_4: 4 * 110 },
//   194: { key: 192, octave_3: 4 * 123.47, octave_4: 4 * 130.81 },
//   222: { key: 222, octave_3: 4 * 146.83, octave_4: 4 * 155.56 },
//   90: { key: 90, octave_3: 77.78, octave_4: 82.41 },
//   88: { key: 88, octave_3: 92.5, octave_4: 98 },
//   67: { key: 67, octave_3: 110, octave_4: 116.54 },
//   86: { key: 86, octave_3: 130.81, octave_4: 138.59 },
//   66: { key: 66, octave_3: 2 * 77.78, octave_4: 2 * 82.41 },
//   78: { key: 78, octave_3: 2 * 92.5, octave_4: 2 * 98 },
//   77: { key: 77, octave_3: 2 * 110, octave_4: 2 * 116.54 },
//   188: { key: 188, octave_3: 2 * 130.81, octave_4: 2 * 138.59 },
//   190: { key: 190, octave_3: 4 * 77.78, octave_4: 4 * 82.41 },
//   191: { key: 191, octave_3: 4 * 92.5, octave_4: 4 * 98 },
//   192: { key: 192, octave_3: 4 * 110, octave_4: 4 * 116.54 },
//   193: { key: 193, octave_3: 4 * 130.81, octave_4: 4 * 138.59 },
// };

export const musicalObjectCorrected: Note[] = [
  {
    keyCode: 87,
    closingNote: "B",
    closingFreq: 493.88,
    closingOctave: 1,
    closingFreqOctave: 493.88,
    openingNote: "Bb",
    openingFreq: 466.16,
    openingOctave: 1,
    openingFreqOctave: 466.16,
  },
  {
    keyCode: 69,
    closingNote: "D",
    closingFreq: 587.33,
    closingOctave: 2,
    closingFreqOctave: 293.67,
    openingNote: "Db",
    openingFreq: 554.36,
    openingOctave: 2,
    openingFreqOctave: 277.18,
  },
  {
    keyCode: 82,
    closingNote: "F",
    closingFreq: 698.45,
    closingOctave: 2,
    closingFreqOctave: 349.23,
    openingNote: "E",
    openingFreq: 659.25,
    openingOctave: 2,
    openingFreqOctave: 329.63,
  },
  {
    keyCode: 84,
    closingNote: "Ab",
    closingFreq: 830.61,
    closingOctave: 2,
    closingFreqOctave: 415.31,
    openingNote: "G",
    openingFreq: 783.99,
    openingOctave: 2,
    openingFreqOctave: 392.0,
  },
  {
    keyCode: 89,
    closingNote: "B",
    closingFreq: 987.76,
    closingOctave: 2,
    closingFreqOctave: 493.88,
    openingNote: "Bb",
    openingFreq: 932.33,
    openingOctave: 2,
    openingFreqOctave: 466.17,
  },
  {
    keyCode: 85,
    closingNote: "D",
    closingFreq: 1174.66,
    closingOctave: 3,
    closingFreqOctave: 391.55,
    openingNote: "Db",
    openingFreq: 1108.73,
    openingOctave: 3,
    openingFreqOctave: 369.58,
  },
  {
    keyCode: 73,
    closingNote: "F",
    closingFreq: 1396.91,
    closingOctave: 3,
    closingFreqOctave: 465.64,
    openingNote: "E",
    openingFreq: 1318.51,
    openingOctave: 3,
    openingFreqOctave: 439.5,
  },
  {
    keyCode: 79,
    closingNote: "Ab",
    closingFreq: 1661.22,
    closingOctave: 3,
    closingFreqOctave: 553.74,
    openingNote: "G",
    openingFreq: 1567.98,
    openingOctave: 3,
    openingFreqOctave: 522.66,
  },
  {
    keyCode: 80,
    closingNote: "B",
    closingFreq: 1978.53,
    closingOctave: 3,
    closingFreqOctave: 659.51,
    openingNote: "Bb",
    openingFreq: 1864.65,
    openingOctave: 3,
    openingFreqOctave: 621.55,
  },
  {
    keyCode: 219,
    closingNote: "D",
    closingFreq: 2349.3,
    closingOctave: 4,
    closingFreqOctave: 587.33,
    openingNote: "Db",
    openingFreq: 2217.44,
    openingOctave: 4,
    openingFreqOctave: 554.36,
  },
  {
    keyCode: 221,
    closingNote: "F",
    closingFreq: 2793.84,
    closingOctave: 4,
    closingFreqOctave: 698.46,
    openingNote: "E",
    openingFreq: 2637.04,
    openingOctave: 4,
    openingFreqOctave: 659.26,
  },
  {
    keyCode: 65,
    closingNote: "F#",
    closingFreq: 369.99,
    closingOctave: 1,
    closingFreqOctave: 369.99,
    openingNote: "F",
    openingFreq: 349.23,
    openingOctave: 1,
    openingFreqOctave: 349.23,
  },
  {
    keyCode: 83,
    closingNote: "A",
    closingFreq: 440.0,
    closingOctave: 1,
    closingFreqOctave: 440.0,
    openingNote: "Ab",
    openingFreq: 415.3,
    openingOctave: 1,
    openingFreqOctave: 415.3,
  },
  {
    keyCode: 68,
    closingNote: "C",
    closingFreq: 523.25,
    closingOctave: 2,
    closingFreqOctave: 261.63,
    openingNote: "B",
    openingFreq: 493.88,
    openingOctave: 1,
    openingFreqOctave: 493.88,
  },
  {
    keyCode: 70,
    closingNote: "Eb",
    closingFreq: 622.25,
    closingOctave: 2,
    closingFreqOctave: 311.13,
    openingNote: "D",
    openingFreq: 587.33,
    openingOctave: 2,
    openingFreqOctave: 293.67,
  },
  {
    keyCode: 71,
    closingNote: "F#",
    closingFreq: 739.99,
    closingOctave: 2,
    closingFreqOctave: 370.0,
    openingNote: "F",
    openingFreq: 698.45,
    openingOctave: 2,
    openingFreqOctave: 349.23,
  },
  {
    keyCode: 72,
    closingNote: "A",
    closingFreq: 880.0,
    closingOctave: 2,
    closingFreqOctave: 440.0,
    openingNote: "Ab",
    openingFreq: 830.61,
    openingOctave: 2,
    openingFreqOctave: 415.31,
  },
  {
    keyCode: 74,
    closingNote: "C",
    closingFreq: 1046.5,
    closingOctave: 3,
    closingFreqOctave: 348.83,
    openingNote: "B",
    openingFreq: 987.76,
    openingOctave: 2,
    openingFreqOctave: 493.88,
  },
  {
    keyCode: 75,
    closingNote: "Eb",
    closingFreq: 1244.51,
    closingOctave: 3,
    closingFreqOctave: 414.84,
    openingNote: "D",
    openingFreq: 1174.66,
    openingOctave: 3,
    openingFreqOctave: 391.55,
  },
  {
    keyCode: 76,
    closingNote: "F#",
    closingFreq: 1479.97,
    closingOctave: 3,
    closingFreqOctave: 493.32,
    openingNote: "F",
    openingFreq: 1396.91,
    openingOctave: 3,
    openingFreqOctave: 465.64,
  },
  {
    keyCode: 186,
    closingNote: "A",
    closingFreq: 1760.0,
    closingOctave: 3,
    closingFreqOctave: 586.67,
    openingNote: "Ab",
    openingFreq: 1661.22,
    openingOctave: 3,
    openingFreqOctave: 553.74,
  },
  {
    keyCode: 192,
    closingNote: "C",
    closingFreq: 2093.0,
    closingOctave: 4,
    closingFreqOctave: 523.25,
    openingNote: "B",
    openingFreq: 1975.53,
    openingOctave: 3,
    openingFreqOctave: 658.51,
  },
  {
    keyCode: 222,
    closingNote: "Eb",
    closingFreq: 2489.02,
    closingOctave: 4,
    closingFreqOctave: 622.26,
    openingNote: "D",
    openingFreq: 2349.3,
    openingOctave: 4,
    openingFreqOctave: 587.33,
  },
  {
    keyCode: 90,
    closingNote: "E",
    closingFreq: 329.63,
    closingOctave: 1,
    closingFreqOctave: 329.63,
    openingNote: "Eb",
    openingFreq: 311.13,
    openingOctave: 1,
    openingFreqOctave: 311.13,
  },
  {
    keyCode: 88,
    closingNote: "G",
    closingFreq: 391.99,
    closingOctave: 1,
    closingFreqOctave: 391.99,
    openingNote: "F#",
    openingFreq: 369.99,
    openingOctave: 1,
    openingFreqOctave: 369.99,
  },
  {
    keyCode: 67,
    closingNote: "Bb",
    closingFreq: 466.16,
    closingOctave: 1,
    closingFreqOctave: 466.16,
    openingNote: "A",
    openingFreq: 440.0,
    openingOctave: 1,
    openingFreqOctave: 440.0,
  },
  {
    keyCode: 86,
    closingNote: "Db",
    closingFreq: 554.36,
    closingOctave: 2,
    closingFreqOctave: 277.18,
    openingNote: "C",
    openingFreq: 523.25,
    openingOctave: 2,
    openingFreqOctave: 261.63,
  },
  {
    keyCode: 66,
    closingNote: "E",
    closingFreq: 659.25,
    closingOctave: 2,
    closingFreqOctave: 329.63,
    openingNote: "Eb",
    openingFreq: 622.25,
    openingOctave: 2,
    openingFreqOctave: 311.13,
  },
  {
    keyCode: 78,
    closingNote: "G",
    closingFreq: 783.99,
    closingOctave: 2,
    closingFreqOctave: 392.0,
    openingNote: "F#",
    openingFreq: 739.99,
    openingOctave: 2,
    openingFreqOctave: 370.0,
  },
  {
    keyCode: 77,
    closingNote: "Bb",
    closingFreq: 932.33,
    closingOctave: 2,
    closingFreqOctave: 466.17,
    openingNote: "A",
    openingFreq: 880.0,
    openingOctave: 2,
    openingFreqOctave: 440.0,
  },
  {
    keyCode: 188,
    closingNote: "Db",
    closingFreq: 1108.73,
    closingOctave: 3,
    closingFreqOctave: 369.58,
    openingNote: "C",
    openingFreq: 1046.5,
    openingOctave: 3,
    openingFreqOctave: 348.83,
  },
  {
    keyCode: 190,
    closingNote: "E",
    closingFreq: 1318.51,
    closingOctave: 3,
    closingFreqOctave: 439.5,
    openingNote: "Eb",
    openingFreq: 1244.51,
    openingOctave: 3,
    openingFreqOctave: 414.84,
  },
  {
    keyCode: 191,
    closingNote: "G",
    closingFreq: 1567.98,
    closingOctave: 3,
    closingFreqOctave: 522.66,
    openingNote: "F#",
    openingFreq: 1479.97,
    openingOctave: 3,
    openingFreqOctave: 493.32,
  },
  {
    keyCode: 16,
    closingNote: "Bb",
    closingFreq: 1864.65,
    closingOctave: 3,
    closingFreqOctave: 621.55,
    openingNote: "A",
    openingFreq: 1760.0,
    openingOctave: 3,
    openingFreqOctave: 586.67,
  },
];
