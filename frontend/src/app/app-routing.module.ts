import { ViewMyResourceComponent } from './res-components/view-my-resource/view-my-resource.component';
import { MyResourcesComponent } from './res-components/my-resources/my-resources.component';
import { ForgotPasswordComponent } from './user-components/forgot-password/forgot-password.component';

import { BlockedUsersComponent } from './user-components/blocked-users/blocked-users.component';
import { BlockedResourcesComponent } from './res-components/blocked-resources/blocked-resources.component';
import { ViewReportedComponent } from './res-components/view-reported/view-reported.component';
import { ViewComponent } from './res-components/view/view.component';
import { SearchComponent } from './other-components/search/search.component';
import { NewComponent } from './res-components/new/new.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './user-components/create-user/create-user.component';
import { LoginComponent } from './user-components/login/login.component';
import { HomeComponent } from './other-components/home/home.component';
import { ReportedComponent } from './res-components/reported/reported.component';
import { ViewBlockedResourceComponent } from './res-components/view-blocked-resource/view-blocked-resource.component';
import { ViewBlockedUserComponent } from './user-components/view-blocked-user/view-blocked-user.component';


const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'users/register', component : CreateUserComponent},
  { path : 'users/profile', component : ProfileComponent},
  { path : 'login', component : LoginComponent},
  { path : 'resource/create', component : NewComponent},
  { path : 'search', component : SearchComponent},
  { path : 'resource/view', component : ViewComponent},
  { path : 'resource/view_reported', component : ViewReportedComponent},
  { path : 'resource/reported', component : ReportedComponent},
  { path : 'resource/my', component : MyResourcesComponent},
  { path : 'resource/view_my', component : ViewMyResourceComponent},
  { path : 'resource/blocked', component : BlockedResourcesComponent},
  { path : 'resource/view_blocked', component : ViewBlockedResourceComponent},
  { path : 'users/blocked', component : BlockedUsersComponent},
  { path : 'users/view_blocked', component : ViewBlockedUserComponent},
  { path : 'users/forgot_password', component : ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
