import { Component, NgZone, OnInit } from "@angular/core";

import * as Tone from "tone";
import { PatchesService } from "../services/patches.service";
@Component({
  selector: "app-web-audio-component",
  templateUrl: "./web-audio-component.component.html",
  styleUrls: ["./web-audio-component.component.scss"],
})
export class WebAudioComponentComponent implements OnInit {
  attackTime = 0.01;
  decayTime = 0.3;
  sustainLevel = 0.4;
  releaseTime = 0.2;
  gainValue = (1 - 0.1) / 6;
  master;

  showPatches: boolean = true;
  modules = [];

  constructor(private zone: NgZone, private patches: PatchesService) {
    Tone.Transport.start();
    this.master = Tone.Destination;
    document.oncontextmenu = () => false;
  }
  ngOnInit() {}
  add(t) {
    this.showPatches = false;
    this.modules.push(t);
    setTimeout(() => {
      this.zone.run(() => (this.showPatches = true));
    }, 10);
  }

  remove(i) {
    this.modules.splice(i, 1);
  }




}
