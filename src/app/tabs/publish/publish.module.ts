import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishPageRoutingModule } from './publish-routing.module';

import { PublishPage } from './publish.page';
import {LoginPageModule} from "../../login/login.module";
import {Step2PageModule} from "../../register/step2/step2.module";
import {TripDetailsPageModule} from "../../trip-details/trip-details.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishPageRoutingModule,
    LoginPageModule,
    Step2PageModule,
    TripDetailsPageModule
  ],
  declarations: [PublishPage]
})
export class PublishPageModule {}
