import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthRepository} from "../package/user/domain/repository/AuthRepository";
import {AuthDataMemory} from "../package/user/infrastructure/AuthDataMemory";
import {LoginUser} from "../package/user/application/LoginUser";
import {RegisterUser} from "../package/user/application/RegisterUser";
import {AuthService} from "./services/auth/auth.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: AuthRepository,
      useFactory: () => {
        return new AuthDataMemory()
      },
      deps: []
    },
    {
      provide: LoginUser,
      useFactory: (authRepository : AuthRepository) =>{
        return new LoginUser(authRepository)
      },
      deps: [AuthRepository]
    },
    {
      provide: RegisterUser,
      useFactory: (authRepository : AuthRepository) =>{
        return new RegisterUser(authRepository)
      },
      deps: [AuthRepository]
    },
    {
      provide: AuthService,
      useFactory: (
        registerUser :RegisterUser,
        loginUser : LoginUser
      ) => {
        return new AuthService(
          loginUser,
          registerUser
        )
      },
      deps: [RegisterUser, LoginUser]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
