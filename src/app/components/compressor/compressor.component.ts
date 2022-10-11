import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import * as Tone from "tone";
@Component({
  selector: "app-compressor",
  templateUrl: "./compressor.component.html",
  styleUrls: ["./compressor.component.scss"],
})
export class CompressorComponent implements OnDestroy {
  comp: Tone.Compressor;

  anim: Subscription;
  reduction: number = 0;

  constructor() {
    this.comp = new Tone.Compressor();
    this.anim = IntervalObservable.create(500).subscribe(() => {
      this.reduction = this.comp.reduction;
    });
  }

  ngOnDestroy() {
    this.anim.unsubscribe();
  }
}
