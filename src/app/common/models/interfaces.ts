import { SinkComponent } from "../../components/sink/sink.component";
import { SourceComponent } from "../../components/source/source.component";

export interface Note {
  closingFreq: number;
  closingFreqOctave: number;
  closingNote: string;
  closingOctave: number;
  keyCode: number;
  openingFreq: number;
  openingFreqOctave: number;
  openingNote: string;
  openingOctave: number;
}

export interface Connection {
  source: SourceComponent;
  sink: SinkComponent;
}

export interface Socket {
  x1, y1, x2, y2: number;
  sink: SinkComponent;
}
