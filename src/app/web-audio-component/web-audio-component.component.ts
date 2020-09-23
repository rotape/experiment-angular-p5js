import { Component, OnInit, HostListener } from "@angular/core";
import { musicalObjectCorrected } from "../common/models/sounds";
@Component({
  selector: "app-web-audio-component",
  templateUrl: "./web-audio-component.component.html",
  styleUrls: ["./web-audio-component.component.scss"],
})
export class WebAudioComponentComponent implements OnInit {
  audioContext: AudioContext;
  oscillatorsArray = [];
  closing: boolean;
  soundEnabled: boolean;
  spaceIsPressed = false;
  gainNode: GainNode;
  attackTime = 0.1;
  decayTime = 0.3;
  sustainLevel = 0.4;
  releaseTime = 0.2;
  gainValue = (1 - 0.1) / 6;
  octaveSwitched: boolean;
  @HostListener("window:keydown", ["$event"])
  keyDown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.spaceIsPressed = true;
      this.changeOctaveClosingAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      if (oscillator && !oscillator.isPlaying) {
        this.oscillatorPlay(oscillator);
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
      const buttonNote = this.findOscillator(event.keyCode);
      if (buttonNote) {
        this.oscillatorStop(buttonNote);
      }
    }
  }
  ngOnInit() {}
  startPlaying() {
    if (this.soundEnabled) {
      console.log("sound enabled", this.soundEnabled);
      if (!this.audioContext) {
        this.audioContext = new ((<any>window).AudioContext ||
          (<any>window).webkitAudioContext)();
        this.createAndConnectGainNode();
        this.createAndInitializeOscillators();
      } else if (this.audioContext.state === "suspended") {
        console.log("RESUME");
        this.audioContext.resume();
      }
    } else if (this.audioContext.state === "running") {
      console.log("sound disabled", this.soundEnabled);
      this.audioContext.suspend();
    }
  }

  createAndConnectGainNode() {
    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.audioContext.destination);
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
  }
  playOrStopOscillator(oscillator) {
    oscillator.isPlaying
      ? this.oscillatorStop(oscillator)
      : this.oscillatorPlay(oscillator);
  }
  oscillatorPlay(oscillator) {
    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.audioContext.destination);
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    const attackTime = this.audioContext.currentTime + this.attackTime;
    gainNode.gain.linearRampToValueAtTime(this.gainValue, attackTime);
    gainNode.gain.setTargetAtTime(
      this.gainValue,
      this.audioContext.currentTime,
      this.releaseTime
    );
    oscillator.connect(gainNode);

    oscillator.isPlaying = true;
    oscillator.gainNode = gainNode;
  }
  oscillatorStop(oscillator) {
    oscillator.isPlaying = false;
    oscillator.gainNode.gain.cancelScheduledValues(
      this.audioContext.currentTime
    );
    oscillator.gainNode.gain.setTargetAtTime(
      0,
      this.audioContext.currentTime,
      this.releaseTime
    );
    setTimeout(() => {
      if (oscillator.gainNode.gain.value < 0.02) {
        oscillator.disconnect(oscillator.gainNode);
        clearInterval();
      }
    }, this.releaseTime * 1000 + 1000);
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
    this.oscillatorsArray = this.oscillatorsArray.map((oscillator) => {
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
    musicalObjectCorrected.map((note, index) => {
      this.oscillatorsArray[index].frequency.value = note.closingFreq;
      this.oscillatorsArray[index].openingSound = note.closingFreq;
      this.oscillatorsArray[index].closingSound = note.openingFreq;
    });
  }

  switchOctaves() {
    this.octaveSwitched
      ? this.tuneOscillators(0.5)
      : this.resetOscillatorsFrequencies();
  }
}
