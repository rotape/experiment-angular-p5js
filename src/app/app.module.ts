import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ExemplePrimerComponent } from './exemple-primer/exemple-primer.component';
import 'p5';
import { FetchPipe } from './pipes/fetch.pipe';
import { ExempleSegonComponent } from './exemple-segon/exemple-segon.component';
const appRoutes: Routes = [
  {path: 'template1', component: ExemplePrimerComponent},
  {path: 'template2', component: ExempleSegonComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ExemplePrimerComponent,
    FetchPipe,
    ExempleSegonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
