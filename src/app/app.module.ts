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

import { AppComponent } from "./app.component";
import { ExemplePrimerComponent } from "./exemple-primer/exemple-primer.component";
import "p5";
import { FetchPipe } from "./pipes/fetch.pipe";
import { ExempleSegonComponent } from "./exemple-segon/exemple-segon.component";
import { WebAudioComponentComponent } from "./web-audio-component/web-audio-component.component";
import { CommonModule } from "@angular/common";
const appRoutes: Routes = [
  { path: "template1", component: ExemplePrimerComponent },
  { path: "template2", component: ExempleSegonComponent },
  { path: "audioComponent", component: WebAudioComponentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ExemplePrimerComponent,
    FetchPipe,
    ExempleSegonComponent,
    WebAudioComponentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
