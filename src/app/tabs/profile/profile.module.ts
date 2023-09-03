import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {LoginPageModule} from "../../login/login.module";
import {
  LabeledIconComponent
} from "../../shared/components/labeled-icon/labeled-icon.component";
import {
  DividerComponent
} from "../../shared/components/divider/divider.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        LoginPageModule
    ],
  declarations: [ProfilePage, LabeledIconComponent, DividerComponent]
})
export class ProfilePageModule {}
