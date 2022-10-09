import { Component, OnInit, HostListener } from "@angular/core";
import { Note } from "../common/models/interfaces";
import { musicalObjectCorrected } from "../common/models/sounds";

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
  ngOnInit() {}




}
