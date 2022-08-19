import { Component, OnInit, HostListener } from "@angular/core";
import { Note } from "../common/models/interfaces";
import { musicalObjectCorrected } from "../common/models/sounds";
import { MMLEmitter } from "mml-emitter";
import { MIDIFile } from "midifile";
import { FMVoice } from "../common/synth/voice-dx7";
import { MIDI } from "../common/synth/midi";
import { Synth } from "../common/synth/synth";
import { SysexDX7 } from "../common/synth/sysex-dx7";
import { Visualizer } from "../common/synth/visualizer";
import { CONFIG } from "../common/synth/config";
import * as defaultPresets from "../common/synth/default-presets";
import { PresetCtrlService } from "../services/preset-ctrl.service";
import { HttpClient } from "@angular/common/http";
import { MidiCtrlService } from "../services/midi-ctrl.service";
@Component({
  selector: "app-web-audio-component",
  templateUrl: "./web-audio-component.component.html",
  styleUrls: ["./web-audio-component.component.scss"],
})
export class WebAudioComponentComponent implements OnInit {
  basePresets: any;
  presets: any[];
  selectedIndex: number;
  presetCtrl: PresetCtrlService;
  constructor(
    private presetCtrlService: PresetCtrlService,
    private midiCtrlService: MidiCtrlService,
    private http: HttpClient
  ) {
    this.presetCtrl = new PresetCtrlService();
  }
  scriptProcessor: ScriptProcessorNode;
  synth;
  midi;
  visualizer;
  audioContext: AudioContext;
  oscillatorsArray = [];
  closing: boolean;
  soundEnabled: boolean;
  spaceIsPressed = false;
  gainNode: GainNode;
  attackTime = 0.01;
  decayTime = 0.3;
  sustainLevel = 0.4;
  releaseTime = 0.2;
  gainValue = (1 - 0.1) / 6;
  octaveSwitched: boolean;
  @HostListener("window:keydown", ["$event"])
  keyDown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.spaceIsPressed = true;
      this.changeOctaveClosingAcordion();
    } else {
      const oscillator = this.findOscillator(event.keyCode);
      if (oscillator && !oscillator.isPlaying) {
        this.oscillatorPlay(oscillator);
      }
    }
  }
  @HostListener("window:keyup", ["$event"])
  keydUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "Space") {
      this.spaceIsPressed = false;
      this.changeOctaveOpeningAcordion();
    } else {
      const buttonNote = this.findOscillator(event.keyCode);
      if (buttonNote) {
        this.oscillatorStop(buttonNote);
      }
    }
  }

  ngOnInit() {}
  onMidiPlay() {
    this.midiCtrlService.onMidiPlay();
  }

  onMidiStop() {
    this.midiCtrlService.onMidiStop();
  }
  reset() {
    this.presetCtrlService.reset();
  }
  save() {
    this.presetCtrlService.save();
  }
  onDemoClick(val?) {
    this.midiCtrlService.onDemoClick(val);
  }
  onVizClick() {
    this.visualizer.cicleMode();
  }
  getBasePresets() {
    this.http.get("roms/ROM1A.SYX").subscribe((data) => {
      this.basePresets = SysexDX7.loadBank(data);
      this.presets = [];
      for (var i = 0; i < this.basePresets.length; i++) {
        if (localStorage[i]) {
          this.presets[i] = localStorage[i];
        } else {
          this.presets[i] = this.basePresets[i];
        }
      }
      this.selectedIndex = 10; // Select E.PIANO 1
      this.presetCtrlService.onChange();
    });
  }
  onChange() {
    throw new Error("Method not implemented.");
  }
  configSyntModule() {
    this.synth = new Synth(FMVoice, CONFIG.polyphony);
    this.midi = new MIDI(this.synth);
    this.audioContext = new window.AudioContext();
    this.setupAudioGraph();
    CONFIG.sampleRate = this.audioContext.sampleRate;
    this.visualizer = new Visualizer(
      "analysis",
      256,
      35,
      0xc0cf35,
      0x2f3409,
      this.audioContext
    );
    this.scriptProcessor = null;
  }

  setupAudioGraph() {
    this.scriptProcessor = this.audioContext.createScriptProcessor(
      CONFIG.bufferSize,
      0,
      2
    );
    this.scriptProcessor.connect(this.audioContext.destination);
    this.scriptProcessor.connect(this.visualizer.getAudioNode());
    var bufferSize = this.scriptProcessor.bufferSize || CONFIG.bufferSize;
    var bufferSizeMs = (1000 * bufferSize) / CONFIG.sampleRate;
    var msPerSample = 1000 / CONFIG.sampleRate;
    // Attach to window to avoid GC. http://sriku.org/blog/2013/01/30/taming-the-scriptprocessornode
    this.scriptProcessor.onaudioprocess = (e) => {
      var buffer = e.outputBuffer;
      var outputL = buffer.getChannelData(0);
      var outputR = buffer.getChannelData(1);

      var sampleTime = performance.now() - bufferSizeMs;
      var visualizerFrequency = FMVoice.frequencyFromNoteNumber(
        this.synth.getLatestNoteDown()
      );
      this.visualizer.setPeriod(CONFIG.sampleRate / visualizerFrequency);

      for (var i = 0, length = buffer.length; i < length; i++) {
        sampleTime += msPerSample;
        if (
          this.synth.eventQueue.length &&
          this.synth.eventQueue[0].timeStamp < sampleTime
        ) {
          this.synth.processMidiEvent(this.synth.eventQueue.shift());
        }

        var output = this.synth.render();
        outputL[i] = output[0];
        outputR[i] = output[1];
      }
    };
  }

  startPlaying() {
    if (this.soundEnabled) {
      console.log("sound enabled", this.soundEnabled);
      if (!this.audioContext) {
        this.audioContext = new ((<any>window).AudioContext ||
          (<any>window).webkitAudioContext)();
        this.createAndConnectGainNode();
        this.createAndInitializeOscillators();
      } else if (this.audioContext.state === "suspended") {
        console.log("RESUME");
        this.audioContext.resume();
      }
    } else if (this.audioContext.state === "running") {
      console.log("sound disabled", this.soundEnabled);
      this.audioContext.suspend();
    }
  }

  createAndConnectGainNode() {
    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.audioContext.destination);
  }
  createAndInitializeOscillators() {
    musicalObjectCorrected.forEach((note: Note) => {
      const oscillator: any = this.audioContext.createOscillator();
      oscillator.frequency.value = note.closingFreq;
      oscillator.openingSound = note.closingFreq;
      oscillator.closingSound = note.openingFreq;
      oscillator.key = note.keyCode;
      oscillator.openingNote = note.openingNote;
      oscillator.closingNote = note.closingNote;
      this.oscillatorsArray.push(oscillator);
      oscillator.start();
    });
  }
  playOrStopOscillator(oscillator) {
    oscillator.isPlaying
      ? this.oscillatorStop(oscillator)
      : this.oscillatorPlay(oscillator);
  }
  oscillatorPlay(oscillator) {
    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.audioContext.destination);
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    const attackTime = this.audioContext.currentTime + this.attackTime;
    gainNode.gain.linearRampToValueAtTime(this.gainValue, attackTime);
    gainNode.gain.setTargetAtTime(
      this.gainValue,
      this.audioContext.currentTime,
      this.releaseTime
    );
    oscillator.connect(gainNode);

    oscillator.isPlaying = true;
    oscillator.gainNode = gainNode;
  }
  oscillatorStop(oscillator) {
    oscillator.isPlaying = false;
    oscillator.gainNode.gain.cancelScheduledValues(
      this.audioContext.currentTime
    );
    oscillator.gainNode.gain.setTargetAtTime(
      0,
      this.audioContext.currentTime,
      this.releaseTime
    );
    setTimeout(() => {
      if (oscillator.gainNode.gain.value < 0.02) {
        oscillator.disconnect(oscillator.gainNode);
        clearInterval();
      }
    }, this.releaseTime * 1000 + 1000);
  }
  changeOctaveClosingAcordion() {
    this.oscillatorsArray.forEach((oscillator) => {
      oscillator.frequency.value = oscillator.openingSound;
    });
  }

  changeOctaveOpeningAcordion() {
    this.oscillatorsArray.forEach((oscillator) => {
      oscillator.frequency.value = oscillator.closingSound;
    });
  }
  findOscillator(key) {
    return this.oscillatorsArray.find((oscillator) => oscillator.key === key);
  }
  tuneOscillators(multiplicator: number) {
    const multipliedFrequenciesOscillatorsArray = this.oscillatorsArray.map(
      (oscillator) => {
        oscillator.frequency.value = oscillator.frequency.value * multiplicator;
        oscillator.openingSound = oscillator.openingSound * multiplicator;
        oscillator.closingSound = oscillator.closingSound * multiplicator;
        return oscillator;
      }
    );
    this.oscillatorsArray = [...multipliedFrequenciesOscillatorsArray];
  }

  resetOscillatorsFrequencies() {
    musicalObjectCorrected.map((note, index) => {
      this.oscillatorsArray[index].frequency.value = note.closingFreq;
      this.oscillatorsArray[index].openingSound = note.closingFreq;
      this.oscillatorsArray[index].closingSound = note.openingFreq;
    });
  }

  switchOctaves() {
    this.octaveSwitched
      ? this.tuneOscillators(0.5)
      : this.resetOscillatorsFrequencies();
  }
}
