import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step2PageRoutingModule } from './step2-routing.module';

import { Step2Page } from './step2.page';
import {LoginPageModule} from "../../login/login.module";
import {
  DateSelectorComponent
} from "../../shared/components/date-selector/date-selector.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step2PageRoutingModule,
    LoginPageModule,
  ],
  declarations: [Step2Page, DateSelectorComponent]
})
export class Step2PageModule {}
