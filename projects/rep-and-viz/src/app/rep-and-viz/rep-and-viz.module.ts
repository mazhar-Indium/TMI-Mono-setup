import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepAndVizComponent } from './rep-and-viz.component';



@NgModule({
  declarations: [RepAndVizComponent],
  imports: [
    CommonModule
  ],
  exports:[RepAndVizComponent]
})
export class RepAndVizModule { }
