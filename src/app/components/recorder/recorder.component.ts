import { Component, OnInit } from "@angular/core";
import * as Tone from "tone";

@Component({
  selector: "app-recorder",
  templateUrl: "./recorder.component.html",
  styleUrls: ["./recorder.component.scss"],
})
export class RecorderComponent {
  audio = document.querySelector("audio");
  actx = Tone.context;
  toneRecorder = new Tone.Recorder;
  dest = this.actx.createMediaStreamDestination();
  recorder = new MediaRecorder(this.dest.stream);
  chunks = [];
  initialized = false;
  playBtnDisabled = true;
  kinds = ['start', 'stop', 'rec'];
  currentKind: number = 0;

  setKind(i) {
    this.currentKind = i;
    if (this.currentKind === 1) {
    }
    else {
    }
}
  recordStart() {
    Tone.start();
    this.initialized = true
    Tone.Transport.start()
    this.recorder.start();
  }
  recordStop() {
    Tone.Transport.stop()
    this.recorder.stop();
    this.dataToAudioFile()
  }

  dataToAudioFile() {
    this.recorder.onstop = (evt) => {
      let blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
      this.audio.src = URL.createObjectURL(blob);
      this.playBtnDisabled = false;
    };
    this.recorder.ondataavailable = (evt) => this.chunks.push(evt.data);
    console.log('DATA TO AUDIO', this.recorder)
  }


}
