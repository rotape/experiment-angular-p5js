import { Component, OnInit, HostListener } from "@angular/core";
import { musicalObjectCorrected } from "../common/models/sounds";
import * as envelope from "envelope-generator";
@Component({
  selector: "app-web-audio-component",
  templateUrl: "./web-audio-component.component.html",
  styleUrls: ["./web-audio-component.component.scss"],
})
export class WebAudioComponentComponent implements OnInit {
  audioContext: AudioContext = new ((<any>window).AudioContext ||
    (<any>window).webkitAudioContext)();
  oscillatorsArray = [];
  closing: boolean;
  spaceIsPressed = false;
  gainNode: GainNode;
  isChecked = false;
  envelope: any;
  @HostListener("window:keydown", ["$event"])
  keyDown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.spaceIsPressed = true;
      this.changeOctaveClosingAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      if (oscillator) {
        this.play(oscillator);
      }
    }
  }
  @HostListener("window:keyup", ["$event"])
  keydUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.spaceIsPressed = false;
      this.changeOctaveOpeningAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      if (oscillator) {
        this.stop(oscillator);
      }
    }
  }
  constructor() {
    this.envelope = new envelope(this.audioContext, {
      attackTime: 0.1,
      decayTime: 3,
      sustainLevel: 0.4,
      releaseTime: 0.1,
    });
  }
  ngOnInit() {
    console.log(this.envelope);
    this.createAndConnectGainNode();
    this.createAndInitializeOscillators();
  }
  createAndConnectGainNode() {
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = (1 - 0.1) / 6;
    this.gainNode.connect(this.audioContext.destination);
  }
  createAndInitializeOscillators() {
    musicalObjectCorrected.forEach((note) => {
      const oscillator: any = this.audioContext.createOscillator();
      oscillator.frequency.value = note.closingFreq;
      oscillator.openingSound = note.closingFreq;
      oscillator.closingSound = note.openingFreq;
      oscillator.key = note.keyCode;
      oscillator.openingNote = note.openingNote;
      oscillator.closingNote = note.closingNote;
      this.oscillatorsArray.push(oscillator);
      oscillator.start();
    });
    console.log(this.oscillatorsArray);
  }
  playOrStopOscillator(oscillator) {
    oscillator.isPlaying ? this.stop(oscillator) : this.play(oscillator);
  }
  play(oscillator) {
    oscillator.connect(this.gainNode);
    oscillator.isPlaying = true;
  }
  stop(oscillator) {
    oscillator.disconnect(this.gainNode);
    oscillator.isPlaying = false;
  }
  changeOctaveClosingAcordion() {
    this.oscillatorsArray.forEach((oscillator) => {
      oscillator.frequency.value = oscillator.openingSound;
    });
  }

  changeOctaveOpeningAcordion() {
    this.oscillatorsArray.forEach((oscillator) => {
      oscillator.frequency.value = oscillator.closingSound;
    });
  }
  findOscillator(key) {
    return this.oscillatorsArray.find((oscillator) => oscillator.key === key);
  }
  tuneOscillators(multiplicator: number) {
    this.oscillatorsArray.forEach((oscillator) => {
      oscillator.frequency.value = (
        oscillator.frequency.value * multiplicator
      ).toFixed(3);
      oscillator.openingSound = (
        oscillator.closingFreq * multiplicator
      ).toFixed(3);
      oscillator.closingSound = (
        oscillator.openingFreq * multiplicator
      ).toFixed(3);
    });
  }

  resetOscillatorsFrequencies() {
    musicalObjectCorrected.forEach((note, index) => {
      this.oscillatorsArray[index].frequency.value = note.closingFreq;
      this.oscillatorsArray[index].openingSound = note.closingFreq;
      this.oscillatorsArray[index].closingSound = note.openingFreq;
    });
  }

  switchOctaves(event) {
    this.isChecked = event.checked;
    this.isChecked
      ? this.tuneOscillators(0.5)
      : this.resetOscillatorsFrequencies();
  }
}
