import { Component, OnInit } from '@angular/core';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import * as P5 from 'p5';
@Component({
  selector: 'app-exemple-primer',
  templateUrl: './exemple-primer.component.html',
  styleUrls: ['./exemple-primer.component.scss']
})
export class ExemplePrimerComponent implements OnInit {
  private oscillator: any;
  private env: any;
  private envelope: any;
  private voices: {};
  private myKeyCodes: number[];
  private octave_3: number[];
  private octave_4: number[];
  private oscillators: any[];
  private oscillators2: any[];
  private osc: any[];

  constructor() {
    this.myKeyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221,
      65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 192, 222, 90, 88, 67, 86, 66, 78,
      77, 188, 190, 191, 192, 193];
    this.octave_3 = [98, 116.54, 138.59, 164.81, 2 * 98, 2 * 116.54,
      2 * 138.59, 2 * 164.81, 4 * 98, 4 * 116.54, 4 * 138.59, 4 * 164.81, 87.31,
      103.83, 123.47, 146.83, 2 * 87.31, 2 * 103.83, 2 * 123.47, 2 * 146.83, 4 * 87.31,
      4 * 103.83, 4 * 123.47, 4 * 146.83, 77.78, 92.5, 110, 130.81, 2 * 77.78, 2 * 92.5,
      2 * 110, 2 * 130.81, 4 * 77.78, 4 * 92.5, 4 * 110, 4 * 130.81];
    this.octave_4 = [103.83, 123.47, 146.83, 174.61, 2 * 103.83, 2 * 123.47, 2 * 146.83,
      2 * 174.61, 4 * 103.83, 4 * 123.47, 4 * 146.83, 4 * 174.61, 92.50, 110, 130.81,
      155.56, 2 * 92.50, 2 * 110, 2 * 130.81, 2 * 155.56, 4 * 92.50, 4 * 110, 4 * 130.81,
      4 * 155.56, 82.41, 98, 116.54, 138.59, 2 * 82.41, 2 * 98, 2 * 116.54, 2 * 138.59,
      4 * 82.41, 4 * 98, 4 * 116.54, 4 * 138.59];
    this.voices = {};
    this.oscillator = new P5.Oscillator();
    this.env = new P5.Envelope();
      // create an envelope to structure each note
    this.envelope = {
      attackLevel : .5,
      attackTime : 0.001,
      decayTime : 0.2,
      susPercent : 0.3,
      releaseTime : 1.0
    };
    this.oscillators = [];
    this.oscillators2 = [];
    this.osc = [];
  }
  ngOnInit() {

    console.log('arrays', this.myKeyCodes, this.octave_3, this.octave_4);
    this.makeSoundsObject();
    this.createVoices();
    console.log('oscillator', this.osc);
    this.fake();
  }
  private makeSoundsObject() {
    this.voices = this.myKeyCodes.reduce((res, x, index) => {
      res[x] = {
        voices1: this.octave_3[index],
        voices2: this.octave_4[index]
      };
      return res;
    }, {});
  }
  private makeVoice(freq) {
    this.oscillator.setType('triangle');
    this.oscillator.freq(freq);
    this.env.setExp(true);
    this.env.setADSR(this.envelope.attackTime, this.envelope.decayTime, this.envelope.susPercent, this.envelope.releaseTime);
    this.env.setRange(this.envelope.attackLevel, this.envelope.releaseLevel);
    this.env.setRange(this.envelope.attackLevel, this.envelope.releaseLevel);
    this.oscillator.amp(this.env);
    this.oscillator.start();
    return this.oscillator;
  }
  private createVoices() {
    for (const key of this.myKeyCodes) {
        const freq1: number = this.voices[key].voices1;
        console.log('freq1',this.makeVoice(this.voices[key].voices1));
        this.osc.push(this.makeVoice(this.voices[key].voices1));
        console.log('ha', key, this.voices[key]);
        const freq2: number = this.voices[key].voices2;
        this.oscillators.push(this.makeVoice(freq1));
        this.oscillators2.push(this.makeVoice(freq2));
      }
  }
  private playEnv(sound) {
    this.env.triggerAttack(this.oscillators[sound]);
  }
  private releaseEnv(sound) {
    this.env.triggerRelease(sound);
  }
  private keyPressed(freq) {
          this.releaseEnv(freq);
          this.playEnv(freq);
  }
  private keyReleased(freq) {
        this.releaseEnv(freq);
        this.releaseEnv(freq);
  }
  public fake() {
    return new P5((p5) => {
      p5.setup = () => {
        // this.createVoices(p5);
        p5.createCanvas(800, 400);
        p5.textSize(18);
      };
      p5.draw = () => {
        if (p5.keyIsPressed && p5.keyIsDown(32) === true ) {
          console.log('keycode',p5.keyCode);
          console.log('keyyyyyyy', this.voices[p5.keyCode]);
          if (this.voices[p5.keyCode]) {
            const freq: number = this.voices[p5.keyCode].voices1;
            this.keyPressed(freq);
            this.keyReleased(freq);
          }
        }
        if (p5.keyIsPressed && p5.keyIsDown(32) === false) {
          if (this.voices[p5.keyCode]) {
            console.log('kevoisss',  this.voices);
            const freq: number = this.voices[p5.keyCode].voices2;
            this.keyPressed(freq);
            this.keyReleased(freq);
          }
        }
      };
  });
}
}
