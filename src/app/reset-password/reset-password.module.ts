import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import {LoginPageModule} from "../login/login.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ResetPasswordPageRoutingModule,
        LoginPageModule
    ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
