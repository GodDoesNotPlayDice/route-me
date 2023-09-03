import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import {
  SearchInputComponent
} from "../../shared/components/search-input/search-input.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchPageRoutingModule,
    ],
  declarations: [SearchPage, SearchInputComponent]
})
export class SearchPageModule {}
