import { Component, OnInit, HostListener } from "@angular/core";
import { musicalObject } from "../common/models/sounds";
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
  @HostListener("window:keydown", ["$event"])
  keyboardInput(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.changeOctaveClosingAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      this.play(oscillator);
    }
  }
  @HostListener("window:keyup", ["$event"])
  keyboardUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.changeOctaveOpeningAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      this.stop(oscillator);
    }
  }
  constructor() {}
  ngOnInit() {
    this.createAndConnectGainNode();
    this.createAndInitializeOscillators();
  }
  createAndConnectGainNode() {
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = (1 - 0.1) / 6;
    this.gainNode.connect(this.audioContext.destination);
  }
  createAndInitializeOscillators() {
    musicalObject.forEach((note) => {
      const oscillator: any = this.audioContext.createOscillator();
      oscillator.frequency.value = note.octave_3;
      oscillator.openingSound = note.octave_3;
      oscillator.closingSound = note.octave_4;
      oscillator.key = note.key;
      this.oscillatorsArray.push(oscillator);
      oscillator.start();
    });
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
}
