import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {InputTextComponent} from "../shared/components/input-text/input-text.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FilledButtonComponent} from "../shared/components/filled-button/filled-button.component";
import {CheckboxComponent} from "../shared/components/checkbox/checkbox.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RadioButtonComponent} from "../shared/components/radio-button/radio-button.component";
import {LogoComponent} from "../shared/components/logo/logo.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
    declarations: [LoginPage, InputTextComponent, FilledButtonComponent, CheckboxComponent, RadioButtonComponent, LogoComponent]
})
export class LoginPageModule {}
