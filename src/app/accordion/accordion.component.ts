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
  octaveSwitched: boolean;
  pressedKey;
  pressedOctave;

  @Output() onKeyDown = new EventEmitter<any>();
  @Output() onKeyUp = new EventEmitter<any>();
  @HostListener("window:keydown", ["$event"])
  keydDown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.SpaceIsPressed = true;
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      if (this.SpaceIsPressed && oscillator && !oscillator.isPlaying) {
        this.keyDown(oscillator.openingNote, oscillator.openingOctave);
        oscillator.isPlaying = true;
      }
      if (!this.SpaceIsPressed && oscillator && !oscillator.isPlaying) {
        this.keyDown(oscillator.closingNote, oscillator.closingOctave);
        oscillator.isPlaying = true;
      }
    }
  }
  @HostListener("window:keyup", ["$event"])
  keydUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.SpaceIsPressed = false;
    } else {
      const buttonNote = this.findOscillator(event.keyCode);
      if (buttonNote) {
        console.log("KEYUP", event, buttonNote);
        this.keyUp(buttonNote.closingNote, buttonNote.closingOctave);
        buttonNote.isPlaying = false;
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

  playOrStopOscillator(oscillator) {
    oscillator.isPlaying
      ? this.oscillatorStop(oscillator)
      : this.oscillatorPlay(oscillator);
  }
  oscillatorStop(oscillator: any) {
    oscillator.isPlaying = false;
  }
  oscillatorPlay(oscillator) {
    if (!oscillator.isPlaying) {
      oscillator.isPlaying = true;
    }
  }

  findOscillator(key) {
    return this.Oscillators.find((oscillator) => oscillator.keyCode === key);
  }
  tuneOscillators(multiplicator: number) {
    const multipliedFrequenciesOscillatorsArray = this.Oscillators.map(
      (oscillator) => {
        oscillator.openingSound = oscillator.openingSound * multiplicator;
        oscillator.closingSound = oscillator.closingSound * multiplicator;
        return oscillator;
      }
    );
    this.Oscillators = [...multipliedFrequenciesOscillatorsArray];
  }

  // resetOscillatorsFrequencies() {
  //   musicalObjectCorrected.map((note, index) => {
  //     this.Oscillators[index].frequency.value = note.closingFreq;
  //     this.Oscillators[index].openingSound = note.closingFreq;
  //     this.Oscillators[index].closingSound = note.openingFreq;
  //   });
  // }

  // switchOctaves() {
  //   this.octaveSwitched
  //     ? this.tuneOscillators(0.5)
  //     : this.resetOscillatorsFrequencies();
  // }
}
