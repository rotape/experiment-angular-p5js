import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostListener,
  EventEmitter,
  Output,
} from "@angular/core";
import { Note } from "../common/models/interfaces";
import { musicalObjectCorrected } from "../common/models/sounds";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
  @Input() Oscillators: any;
  @Input() SpaceIsPressed: boolean;
  // @Input() SoundEnabled: any;
  audioContext: AudioContext;
  octaveSwitched: boolean;
  pressedKey;
  pressedOctave;
  // @Input() AttackTime = 0.01;
  // @Input() DecayTime = 0.3;
  // @Input() SustainLevel = 0.4;
  // @Input() ReleaseTime = 0.2;
  // @Input() GainValue = (1 - 0.1) / 6;
  @Output() onKeyDown = new EventEmitter<any>();
  @Output() onKeyUp = new EventEmitter<any>();
  @HostListener("window:keydown", ["$event"])
  keydDown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.SpaceIsPressed = true;
      this.changeOctaveClosingAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      console.log("KEYDOWN", event, this.Oscillators);
      if (oscillator && !oscillator.isPlaying) {
        this.keyDown(oscillator.closingNote, oscillator.closingOctave);
        // this.oscillatorPlay(oscillator);
      }
    }
  }
  @HostListener("window:keyup", ["$event"])
  keydUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.SpaceIsPressed = false;
      this.changeOctaveOpeningAcordion();
    } else {
      const buttonNote = this.findOscillator(event.keyCode);
      if (buttonNote) {
        // this.oscillatorStop(buttonNote);
      }
    }
  }
  constructor() {}

  ngOnInit(): void {}
  keyDown(key, octave) {
    this.pressedKey = key;
    this.pressedOctave = octave;
    this.onKeyDown.emit({ note: key, octave });
  }

  keyUp(key, octave) {
    if (this.pressedKey === key && this.pressedOctave === octave) {
      this.pressedKey = null;
      this.pressedOctave = null;
    }
    this.onKeyUp.emit({ note: key, octave });
  }

  // startPlaying() {
  //   if (this.SoundEnabled) {
  //     console.log("sound enabled", this.SoundEnabled);
  //     if (!this.audioContext) {
  //       this.audioContext = new ((<any>window).AudioContext ||
  //         (<any>window).webkitAudioContext)();
  //       this.createAndConnectGainNode();
  //       this.createAndInitializeOscillators();
  //     } else if (this.audioContext.state === "suspended") {
  //       console.log("RESUME");
  //       this.audioContext.resume();
  //     }
  //   } else if (this.audioContext.state === "running") {
  //     console.log("sound disabled", this.SoundEnabled);
  //     this.audioContext.suspend();
  //   }
  // }

  // createAndConnectGainNode() {
  //   const gainNode = this.audioContext.createGain();
  //   gainNode.connect(this.audioContext.destination);
  // }
  // createAndInitializeOscillators() {
  //   musicalObjectCorrected.forEach((note: Note) => {
  //     const oscillator: any = this.audioContext.createOscillator();
  //     oscillator.frequency.value = note.closingFreq;
  //     oscillator.openingSound = note.closingFreq;
  //     oscillator.closingSound = note.openingFreq;
  //     oscillator.key = note.keyCode;
  //     oscillator.openingNote = note.openingNote;
  //     oscillator.closingNote = note.closingNote;
  //     this.Oscillators.push(oscillator);
  //     oscillator.start();
  //   });
  // }

  playOrStopOscillator(oscillator) {
    oscillator.isPlaying
      ? this.oscillatorStop(oscillator)
      : this.oscillatorPlay(oscillator);
  }
  oscillatorStop(oscillator: any) {
    oscillator.isPlaying = false;
  }
  oscillatorPlay(oscillator) {
    if (!oscillator.isConnected) {
      oscillator.isPlaying = true;
    }
  }
  // oscillatorPlay(oscillator) {
  //   const gainNode = this.audioContext.createGain();
  //   gainNode.connect(this.audioContext.destination);
  //   gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
  //   const attackTime = this.audioContext.currentTime + this.AttackTime;
  //   gainNode.gain.linearRampToValueAtTime(this.GainValue, attackTime);
  //   gainNode.gain.setTargetAtTime(
  //     this.GainValue,
  //     this.audioContext.currentTime,
  //     this.ReleaseTime
  //   );
  //   if (!oscillator.isConnected) {
  //     oscillator.connect(gainNode);
  //     oscillator.isPlaying = true;
  //   }
  //   oscillator.gainNode = gainNode;
  // }
  // oscillatorStop(oscillator) {
  //   oscillator.isPlaying = false;
  //   if (this.audioContext) {
  //     oscillator?.gainNode?.gain.cancelScheduledValues(
  //       this.audioContext.currentTime
  //     );
  //     oscillator?.gainNode?.gain?.setTargetAtTime(
  //       0,
  //       this.audioContext.currentTime,
  //       this.ReleaseTime
  //     );
  //   }
  //   setTimeout(() => {
  //     if (oscillator?.gainNode?.gain?.value < 0.02 && oscillator.isConnected) {
  //       oscillator.disconnect(oscillator.gainNode);
  //       clearInterval();
  //     }
  //   }, this.ReleaseTime * 1000 + 1000);
  // }
  changeOctaveClosingAcordion() {
    this.Oscillators.forEach((oscillator) => {
      oscillator.frequency.value = oscillator.openingSound;
    });
  }

  changeOctaveOpeningAcordion() {
    this.Oscillators.forEach((oscillator) => {
      oscillator.frequency.value = oscillator.closingSound;
    });
  }
  findOscillator(key) {
    return this.Oscillators.find((oscillator) => oscillator.keyCode === key);
  }
  tuneOscillators(multiplicator: number) {
    const multipliedFrequenciesOscillatorsArray = this.Oscillators.map(
      (oscillator) => {
        oscillator.frequency.value = oscillator.frequency.value * multiplicator;
        oscillator.openingSound = oscillator.openingSound * multiplicator;
        oscillator.closingSound = oscillator.closingSound * multiplicator;
        return oscillator;
      }
    );
    this.Oscillators = [...multipliedFrequenciesOscillatorsArray];
  }

  resetOscillatorsFrequencies() {
    musicalObjectCorrected.map((note, index) => {
      this.Oscillators[index].frequency.value = note.closingFreq;
      this.Oscillators[index].openingSound = note.closingFreq;
      this.Oscillators[index].closingSound = note.openingFreq;
    });
  }

  switchOctaves() {
    this.octaveSwitched
      ? this.tuneOscillators(0.5)
      : this.resetOscillatorsFrequencies();
  }
}
