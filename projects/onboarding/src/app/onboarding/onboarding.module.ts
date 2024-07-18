import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild([{
      path:"onboarding", component:OnboardingComponent
    }])
  ],
  exports:[OnboardingComponent]
})
export class OnboardingModule { }
