import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'

import { TripDetailsPageRoutingModule } from './trip-details-routing.module';

import { TripDetailsPage } from './trip-details.page';
import {LoginPageModule} from "../login/login.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripDetailsPageRoutingModule,
    LoginPageModule
  ],
  exports: [
    AdaptativeButtonComponent
  ],
  declarations: [TripDetailsPage, AdaptativeButtonComponent]
})
export class TripDetailsPageModule {}
