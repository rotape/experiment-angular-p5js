import { Component } from "@angular/core";
import * as Tone from "tone";
@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"],
})
export class ClockComponent {
  clock;

  constructor() {
    this.clock = new Tone.LFO("32n").start("@16n");
  }
}
