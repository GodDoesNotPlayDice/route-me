import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageModule } from 'src/app/login/login.module'
import { Step1PageModule } from 'src/app/register/step1/step1.module'

import { Step3PageRoutingModule } from './step3-routing.module';

import { Step3Page } from './step3.page';
import {
  InputAreaComponent
} from "../../shared/components/input-area/input-area.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageModule,
    Step1PageModule,
    Step3PageRoutingModule
  ],
  declarations: [Step3Page, InputAreaComponent]
})
export class Step3PageModule {}
