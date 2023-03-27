import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profile } from 'console';


import { ClientBookingsComponent } from './pages/client-bookings/client-bookings.component';
import{ProviderProfileComponent}from './pages/provider-profile/provider-profile.component';
import { MultiFormComponent } from './pages/forms/multi-form/multi-form.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProviderLandingComponent } from './pages/provider-landing/provider-landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterproviderComponent } from './pages/registerprovider/registerprovider.component';
import { SplashComponent } from './pages/splash/splash.component';
import { GuardService } from './services/guard.service';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ProviderHeaderComponent } from './components/provider-header/provider-header.component';
import { FogpassComponent } from './fogpass/fogpass.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';


const routes: Routes = [

  {path:'',component: HomeComponent},
  {path:'form',component:MultiFormComponent, canActivate : [GuardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'signup', component: RegisterproviderComponent},
  {path:'login',component: LoginComponent},
  {path:'splash',component:SplashComponent},     //complete guard when done
  {path:'home',component:HomeComponent},
  {path:'clientbookings',component: ClientBookingsComponent, canActivate : [GuardService]},
  {path: 'landing', component: LandingComponent, canActivate : [GuardService]},
  {path:'planding',component: ProviderLandingComponent, canActivate : [GuardService]},
  {path: 'profile', component: ProfileComponent, canActivate : [GuardService]},
  {path:'rating', component: RatingsComponent},
  {path:'pprofile', component: ProviderProfileComponent},
  {path:'pprofile', component: ProviderHeaderComponent},
  {path: 'password', component: FogpassComponent},
  {path: 'notification', component: NotificationComponent},
  {path: 'reset-password/:reset_token', component: ResetPasswordComponent},
  {path: 'spinner', component: SpinnerComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

