import { Injectable } from "@angular/core";
import { defaultPresets } from "../common/synth/default-presets";
import * as SysexDX7 from "../common/synth/sysex-dx7";
import { FMVoice } from "../common/synth/voice-dx7";
@Injectable({
  providedIn: "root",
})
export class PresetCtrlService {
  lfoWaveformOptions = [
    "Triangle",
    "Saw Down",
    "Saw Up",
    "Square",
    "Sine",
    "Sample & Hold",
  ];
  basePresets: any;
  presets = defaultPresets;
  selectedIndex = 0;
  DEFAULT_PARAM_TEXT = "--";
  paramDisplayText = this.DEFAULT_PARAM_TEXT;

  paramManipulating = false;
  paramDisplayTimer = null;
  params: any;
  constructor() {}

  save() {
    localStorage[this.selectedIndex].setItem(this.presets[this.selectedIndex]);
    console.log("Saved preset %s.", this.presets[this.selectedIndex].name);
  }

  reset() {
    if (confirm("Are you sure you want to reset this patch?")) {
      const basePresets = localStorage.removeItem(`${[this.selectedIndex]}`);
      console.log("Reset preset %s.", this.presets[this.selectedIndex].name);
      this.presets[this.selectedIndex] = basePresets[this.selectedIndex];
      this.onChange();
    }
  }
  onChange() {
    this.params = this.presets[this.selectedIndex];
    FMVoice.setParams(this.params);
    // TODO: separate UI parameters from internal synth parameters
    // TODO: better initialization of computed parameters
    for (var i = 0; i < this.params.operators.length; i++) {
      var op = this.params.operators[i];
      FMVoice.setOutputLevel(i, op.volume);
      FMVoice.updateFrequency(i);
      FMVoice.setPan(i, op.pan);
    }
    FMVoice.setFeedback(this.params.feedback);
  }

  unlockAudioContext(context) {
    if (context.state === "suspended") {
      var events = ["touchstart", "touchend", "mousedown", "keydown"];
      var unlock = () => {
        events.forEach(function (event) {
          document.body.removeEventListener(event, unlock);
        });

        console.log("Resuming audio context...");
        context.resume();
        this.flashParam("** DX7-JS **");
      };

      events.forEach(function (event) {
        document.body.addEventListener(event, unlock, false);
      });
    }
  }

  flashParam(value) {
    this.paramDisplayText = value;
    clearTimeout(this.paramDisplayTimer);
    if (!this.paramManipulating) {
      this.paramDisplayTimer = setTimeout(() => {
        this.paramDisplayText = this.DEFAULT_PARAM_TEXT;
      }, 1500);
    }
  }
}
