import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CoreModule, SharedModule } from '../../../shared/src/public-api';
import { LayoutModule } from '../../../layout/src/app/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AclModule } from '../../../acl/src/app/acl/acl.module';
import { OnboardingModule } from '../../../onboarding/src/app/onboarding/onboarding.module';
import { MasterModule } from '../../../master/src/app/master/master.module';
import { RepAndVizModule } from '../../../rep-and-viz/src/app/rep-and-viz/rep-and-viz.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonStructureModule } from './common-structure/common-structure.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AclModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // CommonStructureModule,
    LayoutModule,
    MasterModule,
    OnboardingModule,
    //AclModule,
    // HomeModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
