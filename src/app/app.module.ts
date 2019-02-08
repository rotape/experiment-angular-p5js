import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatMenuModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ExemplePrimerComponent } from './exemple-primer/exemple-primer.component';
import 'p5';
import { FetchPipe } from './pipes/fetch.pipe';
const appRoutes: Routes = [
  {path: 'template1', component: ExemplePrimerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ExemplePrimerComponent,
    FetchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
