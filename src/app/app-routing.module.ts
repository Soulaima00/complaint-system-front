import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimComponent } from './claim/claim.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowComponent } from './follow/follow.component';
import { SignupComponent } from './signup/signup.component';
import { VerificationComponent } from './verification/verification.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { ServiceService } from './shared/service.service';
import {TreatComponent} from "./treat/treat.component";


const routes: Routes = [
  { path :'claim' , component:ClaimComponent, canActivate: [AuthguardGuard]},
  //
  { path :'dashboard' , component:DashboardComponent , canActivate: [AuthguardGuard]},
  { path :'follow' , component:FollowComponent, canActivate: [AuthguardGuard]},
  { path :'signup' , component:SignupComponent, canActivate: [AuthguardGuard]},
  { path :'verification' , component:VerificationComponent, canActivate: [AuthguardGuard]},
  { path :'about', component:AboutComponent, canActivate: [AuthguardGuard]},
  { path :'contactus', component:ContactusComponent,canActivate: [AuthguardGuard]},
  { path :'treat', component:TreatComponent,canActivate: [AuthguardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ServiceService]
})
export class AppRoutingModule { }
