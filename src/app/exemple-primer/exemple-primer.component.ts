import { Component, HostListener, OnInit } from '@angular/core';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import * as P5 from 'p5';
import { preserveWhitespacesDefault } from '@angular/compiler';
@Component({
  selector: 'app-exemple-primer',
  templateUrl: './exemple-primer.component.html',
  styleUrls: ['./exemple-primer.component.scss']
})
export class ExemplePrimerComponent implements OnInit {
  private oscillator: any;
  private env: any;
  private envelope: any;
  public voices: {};
  public myKeyCodes: number[];
  private octave_3: number[];
  private octave_4: number[];
  private oscillators: any[];
  private oscillators2: any[];
  private osc: any;
  public isDown: boolean;
  public keydown: any;
  public musicalObject: any;
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.keydown = event.keycode;
  }
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
    this.musicalObject = [
      {key: 81, octave_3: 98, octave_4: 103.83},
      {key: 87, octave_3: 116.54, octave_4: 123.47},
      {key: 69, octave_3: 138.59, octave_4:  146.83},
      {key: 82, octave_3: 164.81, octave_4: 174.61},
      {key: 84, octave_3: 2 * 98, octave_4: 2 * 103.83},
      {key: 89, octave_3: 2 * 116.54, octave_4: 2 * 123.47},
      {key: 85, octave_3: 2 * 138.59, octave_4: 2 * 146.83},
      {key: 73, octave_3: 2 * 164.81, octave_4: 2 * 174.61},
      {key: 79, octave_3:  2 * 98, octave_4: 4 * 103.83},
      {key: 80, octave_3: 4 * 116.54, octave_4: 4 * 123.47},
      {key: 219, octave_3: 4 * 138.59, octave_4: 4 * 146.83},
      {key: 221, octave_3: 4 * 164.81, octave_4: 4 * 174.61},
      {key: 65, octave_3: 87.31, octave_4: 92.50},
      {key: 83, octave_3: 103.83, octave_4: 110},
      {key: 68, octave_3: 123.47, octave_4: 130.81},
      {key: 70, octave_3: 146.83, octave_4: 155.56},
      {key: 71, octave_3: 2 * 87.31, octave_4: 2 * 92.50},
      {key: 72, octave_3: 2 * 103.83, octave_4: 2 * 110},
      {key: 74, octave_3: 2 * 123.47, octave_4: 2 * 130.81},
      {key: 75, octave_3: 2 * 146.83, octave_4: 2 * 155.56},
      {key: 76, octave_3: 4 * 87.31, octave_4: 4 * 92.50},
      {key: 186, octave_3: 4 * 103.83, octave_4: 4 * 110},
      {key: 192, octave_3: 4 * 123.47, octave_4: 4 * 130.81},
      {key: 222, octave_3: 4 * 146.83, octave_4: 4 * 155.56},
      {key: 90, octave_3: 77.78, octave_4: 82.41},
      {key: 88, octave_3: 92.5, octave_4: 98},
      {key: 67, octave_3: 110, octave_4: 116.54},
      {key: 86, octave_3: 130.81, octave_4:  138.59},
      {key: 66, octave_3: 2 * 77.78, octave_4:  2 * 82.41},
      {key: 78, octave_3: 2 * 92.5, octave_4: 2 * 98},
      {key: 77, octave_3: 2 * 110, octave_4: 2 * 116.54},
      {key: 188, octave_3: 2 * 130.81, octave_4: 2 * 138.59},
      {key: 190, octave_3: 4 * 77.78, octave_4: 4 * 82.41},
      {key: 191, octave_3: 4 * 92.5, octave_4: 4 * 98},
      {key: 192, octave_3: 4 * 110, octave_4: 4 * 116.54},
      {key: 193, octave_3: 4 * 130.81, octave_4: 4 * 138.59},
    ];
    this.oscillator = new P5.Oscillator();
    this.env = new P5.Envelope();
      // create an envelope to structure each note
    this.envelope = {
      attackLevel : .5,
      attackTime : 0.001,
      decayTime : 0.001,
      susPercent : 0.3,
      releaseTime : 1.0
    };
    this.oscillators = [];
    this.oscillators2 = [];
  }
  ngOnInit() {
    this.osc = this.makeVoice();
    this.makeSoundsObject();
    this.initAcordion();
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
  private makeVoice() {
    this.oscillator.setType('triangle');
    this.env.setExp(true);
    this.env.setADSR(this.envelope.attackTime, this.envelope.decayTime, this.envelope.susPercent, this.envelope.releaseTime);
    this.env.setRange(this.envelope.attackLevel, this.envelope.releaseLevel);
    this.env.setRange(this.envelope.attackLevel, this.envelope.releaseLevel);
    this.oscillator.amp(this.env);
    this.oscillator.start();
    return this.oscillator;
  }
  private createOscillator() {
    this.oscillator.setType('triangle');
    this.env.setExp(true);
    this.env.setADSR(this.envelope.attackTime, this.envelope.decayTime, this.envelope.susPercent, this.envelope.releaseTime);
    this.env.setRange(this.envelope.attackLevel, this.envelope.releaseLevel);
    this.env.setRange(this.envelope.attackLevel, this.envelope.releaseLevel);
    this.oscillator.amp(this.env);
    this.oscillator.start();
    return this.oscillator;
  }
  private playNote(note){
    this.osc.freq(note);
    this.osc.fade(0.1, 0.1);
  }
  public initAcordion() {
    return new P5((p5) => {
      p5.setup = () => {
        this.createOscillator();
      };
      p5.draw = () => {
        // playing sounds when a key is preserveWhitespacesDefault, space switch the voices
        const id = p5.keyCode;
        const buttonPressed = document.getElementById(id);
        
        if (p5.keyIsPressed && p5.keyIsDown(32) === true ) {
          if (this.voices[p5.keyCode]) {
            const freq: number = this.voices[p5.keyCode].voices1;
            this.playNote(freq);
            this.isDown = true;
            console.log(this.isDown);
            console.log('buttonPressed', buttonPressed);
          }
        }
        if (p5.keyIsPressed === false) {
          this.osc.fade(0, 0.1);
          this.isDown = false;
        }
        if (p5.keyIsPressed  && p5.keyIsDown(32) === false) {
          if (this.voices[p5.keyCode]) {
            const freq: number = this.voices[p5.keyCode].voices2;
            this.playNote(freq);
          }
        }
      };
  });
  }

}
