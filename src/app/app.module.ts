import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from "@angular/router";


import { AppComponent } from './app.component';
import { ExemplePrimerComponent } from './exemple-primer/exemple-primer.component';
import 'p5';
const appRoutes: Routes = [
  {path: 'template1', component: ExemplePrimerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ExemplePrimerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
