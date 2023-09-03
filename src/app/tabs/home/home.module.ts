import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {
  SearchBarComponent
} from "../../shared/components/search-bar/search-bar.component";
import {
  DriveCardComponent
} from "../../shared/components/drive-card/drive-card.component";
import {LoginPageModule} from "../../login/login.module";
import {
  FilterButtonComponent
} from "../../shared/components/filter-button/filter-button.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginPageModule,
  ],
  declarations: [HomePage, SearchBarComponent, DriveCardComponent, FilterButtonComponent]
})
export class HomePageModule {}
