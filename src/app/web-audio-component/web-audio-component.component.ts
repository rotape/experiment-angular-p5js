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
  ngOnInit() {
    this.setup();
  }
  setup() {
    this.createAndInitializeOscillators();
    console.log(this.audioContext);
  }
  createAndInitializeOscillators() {
    musicalObject.forEach((note) => {
      this.gainNode = this.audioContext.createGain();
      const oscillator: any = this.audioContext.createOscillator();
      oscillator.frequency.value = note.octave_3;
      oscillator.openingSound = note.octave_3;
      oscillator.closingSound = note.octave_4;
      oscillator.key = note.key;
      this.oscillatorsArray.push(oscillator);
      oscillator.start();
    });
  }
  playOrStopOscillator(oscillator, $event) {
    oscillator.isPlaying ? this.stop(oscillator) : this.play(oscillator);
  }
  play(oscillator) {
    oscillator.connect(this.audioContext.destination);
    oscillator.isPlaying = true;
    console.log("OSCILLATRO", oscillator);
  }
  stop(oscillator) {
    oscillator.disconnect(this.audioContext.destination);
    oscillator.isPlaying = false;
  }
  findOscillator(key) {
    return this.oscillatorsArray.find((oscillator) => oscillator.key === key);
  }
}
