import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

import { AppComponent } from "./app.component";
import { FetchPipe } from "./pipes/fetch.pipe";
import { WebAudioComponentComponent } from "./web-audio-component/web-audio-component.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { MatSliderModule } from "@angular/material/slider";
import { LfoComponent } from "./components/lfo/lfo.component";
import { MembraneComponent } from "./components/membrane/membrane.component";
import { MixerComponent } from "./components/mixer/mixer.component";
import { NoiseComponent } from "./components/noise/noise.component";
import { OscComponent } from "./components/osc/osc.component";
import { PatchOverlayComponent } from "./components/patch-overlay/patch-overlay.component";
import { PingpongComponent } from "./components/pingpong/pingpong.component";
import { SeqComponent } from "./components/seq/seq.component";
import { Seq2Component } from "./components/seq2/seq2.component";
import { SignalComponent } from "./components/signal/signal.component";
import { SinkComponent } from "./components/sink/sink.component";
import { SliderComponent } from "./components/slider/slider.component";
import { SourceComponent } from "./components/source/source.component";
import { TogglesComponent } from "./components/toggles/toggles.component";
import { TriggerComponent } from "./components/trigger/trigger.component";
import { AdsrComponent } from "./components/adsr/adsr.component";
import { AnalyserComponent } from "./components/analyser/analyser.component";
import { BinaryComponent } from "./components/binary/binary.component";
import { CableComponent } from "./components/cable/cable.component";
import { ClockComponent } from "./components/clock/clock.component";
import { PatchesService } from "./services/patches.service";
import { FrameComponent } from "./components/frame/frame.component";
import { CompressorComponent } from "./components/compressor/compressor.component";
import { FilterComponent } from './components/filter/filter.component';
import { RecorderComponent } from './components/recorder/recorder.component';

const appRoutes: Routes = [{ path: "", component: WebAudioComponentComponent }];

@NgModule({
  declarations: [
    AppComponent,
    FetchPipe,
    WebAudioComponentComponent,
    AccordionComponent,
    LfoComponent,
    MembraneComponent,
    MixerComponent,
    NoiseComponent,
    OscComponent,
    PatchOverlayComponent,
    PingpongComponent,
    SeqComponent,
    Seq2Component,
    SignalComponent,
    SinkComponent,
    SliderComponent,
    SourceComponent,
    TogglesComponent,
    TriggerComponent,
    AdsrComponent,
    AnalyserComponent,
    BinaryComponent,
    CableComponent,
    ClockComponent,
    FrameComponent,
    CompressorComponent,
    FilterComponent,
    RecorderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true,
      relativeLinkResolution: "legacy",
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [PatchesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
