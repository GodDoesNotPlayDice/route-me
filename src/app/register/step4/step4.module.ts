import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step4PageRoutingModule } from './step4-routing.module';

import { Step4Page } from './step4.page';
import {LoginPageModule} from "../../login/login.module";
import {Step1PageModule} from "../step1/step1.module";
import {
  InputAreaComponent
} from "../../shared/components/input-area/input-area.component";
import {
  UserPreferencesSelectorComponent
} from "../../shared/components/user-preferences-selector/user-preferences-selector.component";
import {
  UserPreferencesSelectorBarComponent
} from "../../shared/components/user-preferences-selector-bar/user-preferences-selector-bar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step4PageRoutingModule,
    LoginPageModule,
    Step1PageModule,
    ReactiveFormsModule
  ],
  declarations: [Step4Page, InputAreaComponent, UserPreferencesSelectorComponent, UserPreferencesSelectorBarComponent, UserPreferencesSelectorBarComponent]
})
export class Step4PageModule {}
