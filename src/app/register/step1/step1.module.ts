import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StepperItemComponent } from 'src/app/shared/components/stepper-item/stepper-item.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'

import { Step1PageRoutingModule } from './step1-routing.module';

import { Step1Page } from './step1.page';
import {LoginPageModule} from "../../login/login.module";

@NgModule( {
  imports     : [
    CommonModule,
    FormsModule,
    IonicModule,
    Step1PageRoutingModule,
    LoginPageModule
  ],
  exports     : [
    StepperComponent
  ],
  declarations: [ Step1Page, StepperComponent, StepperItemComponent ]
})
export class Step1PageModule {}
