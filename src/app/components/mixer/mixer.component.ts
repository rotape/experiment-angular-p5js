import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { animationFrameScheduler, of, Subscription } from 'rxjs';
import { repeat } from 'rxjs/operators';
import * as Tone from 'tone';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent implements OnInit, OnDestroy, OnChanges {
  synthChannel: Tone.Gain;
  channels: any[];
  bpm;
  beats;
  anim: Subscription;

  constructor() {
    this.synthChannel =  new Tone.Gain(0).toDestination(),
      this.channels = [
          new Tone.Gain(0).toDestination(),
          new Tone.Gain(0).toDestination(),
          new Tone.Gain(0).toDestination(),
          new Tone.Gain(0).toDestination()
      ];
      this.bpm = Tone.Transport.bpm;

      this.anim = of(0, animationFrameScheduler).pipe(
          repeat())
          .subscribe(() => {
              this.beats = Tone.Transport.bpm.value;
          });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy() {
      this.anim.unsubscribe();
  }

}
