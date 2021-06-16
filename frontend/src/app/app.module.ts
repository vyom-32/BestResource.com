import { ClipboardModule } from 'ngx-clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './user-components/create-user/create-user.component';
import { LoginComponent } from './user-components/login/login.component';
import { HomeComponent } from './other-components/home/home.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { NewComponent } from './res-components/new/new.component';
import { SearchComponent } from './other-components/search/search.component';
import { ViewComponent } from './res-components/view/view.component';
import { ReportedComponent } from './res-components/reported/reported.component';
import { ViewReportedComponent } from './res-components/view-reported/view-reported.component';
import { BlockedUsersComponent } from './user-components/blocked-users/blocked-users.component';
import { BlockedResourcesComponent } from './res-components/blocked-resources/blocked-resources.component';
import { ViewBlockedResourceComponent } from './res-components/view-blocked-resource/view-blocked-resource.component';
import { ViewBlockedUserComponent } from './user-components/view-blocked-user/view-blocked-user.component';
import { ForgotPasswordComponent } from './user-components/forgot-password/forgot-password.component';
import { MyResourcesComponent } from './res-components/my-resources/my-resources.component';
import { ViewMyResourceComponent } from './res-components/view-my-resource/view-my-resource.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NewComponent,
    SearchComponent,
    ViewComponent,
    ReportedComponent,
    ViewReportedComponent,
    BlockedUsersComponent,
    BlockedResourcesComponent,
    ViewBlockedResourceComponent,
    ViewBlockedUserComponent,
    ForgotPasswordComponent,
    MyResourcesComponent,
    ViewMyResourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
