import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

import { IonicModule } from '@ionic/angular';
import { Step1PageModule } from 'src/app/register/step1/step1.module'
import { CountrySelectorBarComponent } from 'src/app/shared/components/country-selector-bar/country-selector-bar.component'
import { CountrySelectorComponent } from 'src/app/shared/components/country-selector/country-selector.component'
import { ProfilePageModule } from 'src/app/tabs/profile/profile.module'

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
    MatNativeDateModule,
    Step1PageModule,
    MatSelectModule,
    ProfilePageModule
  ],
  declarations: [ Step2Page, DateSelectorComponent, CountrySelectorComponent,
    CountrySelectorBarComponent ]
})
export class Step2PageModule {}
