import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SharedComponent,
  ],
  imports: [CommonModule],
  //providers: [SharedService]
 
  
})
export class SharedModule { }
