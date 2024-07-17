import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AclComponent } from './acl.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AclComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild([
      {
        path: 'acl', component:AclComponent
      }
    ])
  ]
})
export class AclModule { }
