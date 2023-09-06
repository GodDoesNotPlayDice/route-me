import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'

import { IonicModule } from '@ionic/angular';

import { Step2PageRoutingModule } from './step2-routing.module';

import { Step2Page } from './step2.page';
import {LoginPageModule} from "../../login/login.module";
import {
  DateSelectorComponent
} from "../../shared/components/date-selector/date-selector.component";
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step2PageRoutingModule,
    LoginPageModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [Step2Page, DateSelectorComponent]
})
export class Step2PageModule {}
