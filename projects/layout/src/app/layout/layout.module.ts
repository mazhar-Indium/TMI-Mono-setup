import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MasterModule } from '../../../../master/src/app/master/master.module';
import { SharedModule } from '../../../../shared/src/public-api';
import { CommonStructureModule } from '../../../../shell/src/app/common-structure/common-structure.module';
import { MaterialModule } from '../../../../shell/src/app/material.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    // ImageCropperModule,
    FormsModule,
    SharedModule,
    CommonStructureModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    // FlexLayoutModule,
    // LayoutRoutingModule,
    MasterModule,
    RouterModule.forChild([
      {path:"layout", component:LayoutComponent}
    ])
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
