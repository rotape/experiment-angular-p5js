import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import MIDIPlayer from "../common/synth/midi.js";
import MMLEmitter from "mml-emitter";
@Injectable({
  providedIn: "root",
})
export class MidiCtrlService {
  mml = null;
  mmlDemos = [
    "t92 l8 o4 $" +
      "[>cg<cea]2.        [>cg<ceg]4" +
      "[>>a<a<c+fa+]2.    [>>a <a <c+ e a]4" +
      "[>>f <f g+ <c g]2. [>>f <f g+ <c f]4" +
      "[>>g <g g+ b <g+]2.[>>g <g <g]4;" +
      "t92 $ l1 o3 v12 r r r r2 r8 l32 v6 cdef v8 ga v10 b<c v12 de v14 fg;",
    "t120$ l8 o3    >g+2.. g+ a+4. a+ <c2 >a+    g+2.. a+4 a+4 <c4. >d+" +
      "              a+ g+2. g+ a+4. a+ <c2 >a+   g+2.. a+4 a+4 <c2.;" +
      "t120$l8 o4    rr g g4 g+ a+4 d4 d4 d+2     d c g g4 g+ a+4 d4 d4 d+2" +
      "              rr g g4 g+ a+4 d4 d4 d+2     d c g g4 g+ a+4 d4 d4 d+2.;" +
      "t120$l8 o4 v9 rr d+ d+2 r >a+4 a+4 <c2     >a+ g+ <d+ d+2 r >a+4 a+4 a+2" +
      "              rr d+ d+2 r >a+4 a+4 <c2     >a+ g+ <d+ d+2 r >a+4 a+4 a+2.;" +
      "t120$l8 o4 v8 rr c c2 r   >f4 f4 g2        a+ g+ <c c2 >f f4 r f g2<" +
      "              rr c c2 r   >f4 f4 g2        a+ g+ <c c2 >f f4 r f g2.<;",
  ];
  qwertyNotes = [];
  synth: any;
  constructor(private http: HttpClient) {
    //Lower row: zsxdcvgbhnjm...
    this.qwertyNotes[16] = 41; // = F2
    this.qwertyNotes[65] = 42;
    this.qwertyNotes[90] = 43;
    this.qwertyNotes[83] = 44;
    this.qwertyNotes[88] = 45;
    this.qwertyNotes[68] = 46;
    this.qwertyNotes[67] = 47;
    this.qwertyNotes[86] = 48; // = C3
    this.qwertyNotes[71] = 49;
    this.qwertyNotes[66] = 50;
    this.qwertyNotes[72] = 51;
    this.qwertyNotes[78] = 52;
    this.qwertyNotes[77] = 53; // = F3
    this.qwertyNotes[75] = 54;
    this.qwertyNotes[188] = 55;
    this.qwertyNotes[76] = 56;
    this.qwertyNotes[190] = 57;
    this.qwertyNotes[186] = 58;
    this.qwertyNotes[191] = 59;

    // Upper row: q2w3er5t6y7u...
    this.qwertyNotes[81] = 60; // = C4 ("middle C")
    this.qwertyNotes[50] = 61;
    this.qwertyNotes[87] = 62;
    this.qwertyNotes[51] = 63;
    this.qwertyNotes[69] = 64;
    this.qwertyNotes[82] = 65; // = F4
    this.qwertyNotes[53] = 66;
    this.qwertyNotes[84] = 67;
    this.qwertyNotes[54] = 68;
    this.qwertyNotes[89] = 69;
    this.qwertyNotes[55] = 70;
    this.qwertyNotes[85] = 71;
    this.qwertyNotes[73] = 72; // = C5
    this.qwertyNotes[57] = 73;
    this.qwertyNotes[79] = 74;
    this.qwertyNotes[48] = 75;
    this.qwertyNotes[80] = 76;
    this.qwertyNotes[219] = 77; // = F5
    this.qwertyNotes[187] = 78;
    this.qwertyNotes[221] = 79;
    this.qwertyNotes[220] = 80;
  }

  createMML(idx) {
    var mml = new MMLEmitter(AudioContext, this.mmlDemos[idx]);
    var noteHandler = function (e) {
      this.synth.noteOn(e.midi, e.volume / 20);
      e.noteOff(function () {
        this.synth.noteOff(e.midi);
      });
    };
    mml.tracks.map(function (track) {
      track.on("note", noteHandler);
    });
    return mml;
  }
  onMidiPlay() {
    this.http
      .get(this.midiFiles[this.midiFileIndex], { responseType: "arraybuffer" })
      .subscribe((data) => {
        console.log("Loaded %d bytes.", data.byteLength);
        var midiFile = new midiFile(data);
        this.midiPlayer.load(midiFile);
        this.midiPlayer.play(function () {
          console.log("MIDI file playback ended.");
        });
      });
  }

  onMidiStop = function () {
    this.midiPlayer.stop();
    this.synth.panic();
  };

  // MIDI stuff
  midiFileIndex = 0;
  midiFiles = [
    "midi/rachmaninoff-op39-no6.mid",
    "midi/minute_waltz.mid",
    "midi/bluebossa.mid",
    "midi/cantaloup.mid",
    "midi/chameleon.mid",
    "midi/tunisia.mid",
    "midi/sowhat.mid",
    "midi/got-a-match.mid",
  ];
  midiPlayer = new MIDIPlayer({
    output: {
      // Loopback MIDI to input handler.
      send: function (data, timestamp) {
        // Synthetic MIDIMessageEvent
        this.midi.send({ data: data, timeStamp: timestamp });
      },
    },
  });

  onDemoClick(idx) {
    if (this.mml && this.mml._ended == 0) {
      this.mml.stop();
      this.synth.panic();
      this.mml = null;
    } else {
      this.mml = this.createMML(idx);
      this.mml.start();
    }
  }

  // onVizClick() {
  //   visualizer.cycleMode();
  // };

  onKeyDown(ev) {
    var note = this.qwertyNotes[ev.keyCode];
    if (ev.metaKey) return false;
    if (ev.keyCode == 32) {
      this.synth.panic();
      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }
    if (note) {
      if (!ev.repeat) {
        this.synth.noteOn(note, 0.8 + (ev.ctrlKey ? 0.47 : 0));
      }
      ev.stopPropagation();
      ev.preventDefault();
    }
    return false;
  }

  onKeyUp(ev) {
    var note = this.qwertyNotes[ev.keyCode];
    if (note) this.synth.noteOff(note);
    return false;
  }

  // window.addEventListener('keydown', this.onKeyDown, false);
  // window.addEventListener('keyup', this.onKeyUp, false);
}
