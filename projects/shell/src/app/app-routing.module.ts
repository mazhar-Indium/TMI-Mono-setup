import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { loadRemoteModule } from '@angular-architects/module-federation';



const LAYOUT_URL = 'http://localhost:4000/remoteEntry.js';
const ACL_URL = 'http://localhost:4100/remoteEntry.js';
const ONBOARDING_URL = 'http://localhost:4200/remoteEntry.js';
const MASTERS_URL = 'http://localhost:4300/remoteEntry.js';
const REPV_URL = 'http://localhost:4400/remoteEntry.js';

const routes: Routes = [
  // {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  {path:'layout', loadChildren: () => {
    return loadRemoteModule({
      remoteEntry: LAYOUT_URL,
      remoteName: "layout",
      exposedModule: "./LayoutModule"
    }).then((m:any) => m.LayoutModule).catch(err => console.log(err)
    )
  }},
  {path:'acl', loadChildren: () => {
    return loadRemoteModule({
      remoteEntry: ACL_URL,
      remoteName: "acl",
      exposedModule: "./AclModule"
    }).then((m:any) => m.AclModule).catch(err => console.log(err)
    )
  }},
  {path:'onboarding', loadChildren: () => {
    return loadRemoteModule({
      remoteEntry: ONBOARDING_URL,
      remoteName: "onboarding",
      exposedModule: "./OnboardingModule"
    }).then((m:any) => m.OnboardingModule).catch(err => console.log(err)
    )
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
