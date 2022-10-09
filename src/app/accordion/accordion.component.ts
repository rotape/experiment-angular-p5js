import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostListener,
} from "@angular/core";
import { Note } from "../common/models/interfaces";
import { musicalObjectCorrected } from "../common/models/sounds";
import * as Tone from 'tone';
@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
  SpaceIsPressed: boolean;
  audioContext: AudioContext;
  octaveSwitched: boolean;
  @Input() AttackTime;
  @Input() DecayTime;
  @Input() SustainLevel;
  @Input() ReleaseTime;
  @Input() GainValue;
  playingNote: Note;

  @HostListener("window:keydown", ["$event"])
  keyDown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.SpaceIsPressed = true;
      // this.changeOctaveClosingAcordion();

    } else {
      const note = this.findNoteFromEvent(event)
      this.SpaceIsPressed ? this.play(note.closingFreq) : this.play(note.openingFreq)
    }
  }



  @HostListener("window:keyup", ["$event"])
  keydUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.SpaceIsPressed = false;
    }
  }
  synth: any;
  msdown: boolean = false;
  noteArray: Note[] = [...musicalObjectCorrected]

  constructor() {
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
  }

  ngOnInit(): void {

  }

  chorus() {
    var chorus = new Tone.Chorus(4, 2.5, 0.5);
    this.synth = new Tone.PolySynth(Tone.MonoSynth)
      .toDestination()
      .connect(chorus);
  }

  reverb() {
    var reverb = new Tone.JCReverb(0.9).connect(Tone.Destination);
    var delay = new Tone.FeedbackDelay(0.2);
    this.synth = new Tone.DuoSynth().chain(delay, reverb);
  }

  phaser() {
    var phaser = new Tone.Phaser({
      frequency: 2,
      octaves: 2,
      baseFrequency: 55,
    }).toDestination();

    this.synth.connect(phaser);
  }

  msover(note) {
    if (this.msdown) {
      this.play(note);
    }
  }

  play(note) {
    // this.synth.triggerAttackRelease(['C3', 'E3', 'G3'], '8n');
    //  this.synth.triggerAttackRelease(note,"8n");
    this.synth.triggerAttackRelease([note], '8n');
  }

   findNoteFromEvent(event: any) {
    const note = musicalObjectCorrected.find((oscillator) => event.keyCode === oscillator.keyCode);
    this.playingNote = note;
    return note
  }




}
