import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';

import { ClientBookingsComponent } from './pages/client-bookings/client-bookings.component';
import { MultiFormComponent } from './pages/forms/multi-form/multi-form.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterproviderComponent } from './pages/registerprovider/registerprovider.component';
import { ProviderLandingComponent } from './pages/provider-landing/provider-landing.component';
import { NgToastModule } from 'ng-angular-popup';
import { SplashComponent } from './pages/splash/splash.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { ProviderHeaderComponent } from './components/provider-header/provider-header.component';
import { ProviderProfileComponent } from './pages/provider-profile/provider-profile.component';
import { FogpassComponent } from './fogpass/fogpass.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SpinnerComponent } from './pages/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LandingComponent,
    MultiFormComponent,
    RegisterproviderComponent,
    ProviderLandingComponent,
    ClientBookingsComponent,
    SplashComponent,
    ProfileComponent,
    ProviderProfileComponent,
    RatingsComponent,
    ProviderHeaderComponent,
    FogpassComponent,
    NotificationComponent,
    ResetPasswordComponent,
    SpinnerComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NgToastModule,
    Ng5SliderModule,
    Ng2SearchPipeModule,
    NgxSmartLoaderModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home',component:HomeComponent},
    
    ])
   

  ],

  providers: [NgxSmartLoaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
