import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step1PageRoutingModule } from './step1-routing.module';

import { Step1Page } from './step1.page';
import {LoginPageModule} from "../../login/login.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step1PageRoutingModule,
    LoginPageModule
  ],
  declarations: [Step1Page]
})
export class Step1PageModule {}
