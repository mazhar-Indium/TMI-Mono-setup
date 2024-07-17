import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepAndVizComponent } from './rep-and-viz/rep-and-viz.component';
import { RepAndVizModule } from './rep-and-viz/rep-and-viz.module';

@NgModule({
  declarations: [
    AppComponent,
    RepAndVizComponent
  ],
  imports: [
    BrowserModule,
    RepAndVizModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
