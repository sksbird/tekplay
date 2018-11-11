import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ComplaintAddComponent } from './components/complaint-add/complaint-add.component';
import { ComplaintViewComponent } from './components/complaint-view/complaint-view.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './guards/auth.guard';
import { ComplaintService } from './services/complaint.service';

const appRouters: Routes = [
  { path: '', redirectTo: '/complaints/list', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'complaints', component: HomeComponent, children:
      [
        { path: '', redirectTo: '/complaints/list', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'list', component: ComplaintListComponent, canActivate: [AuthGuard] },
        { path: 'new', component: ComplaintAddComponent, canActivate: [AuthGuard] },
        { path: 'view/:id', component: ComplaintViewComponent, canActivate: [AuthGuard] },
      ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ComplaintAddComponent,
    ComplaintViewComponent,
    ComplaintListComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouters)
  ],
  providers: [ComplaintService],
  bootstrap: [AppComponent]
})

export class AppModule { }
