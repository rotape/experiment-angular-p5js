import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { AppComponent } from "./app.component";
import { FetchPipe } from "./pipes/fetch.pipe";
import { WebAudioComponentComponent } from "./web-audio-component/web-audio-component.component";
import { SynthesizerModule } from "./synth/synthesizer.module";
const appRoutes: Routes = [{ path: "", component: WebAudioComponentComponent }];

@NgModule({
  declarations: [AppComponent, FetchPipe, WebAudioComponentComponent],
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
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    SynthesizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
