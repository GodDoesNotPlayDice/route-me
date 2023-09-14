import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'
import { GoogleMapComponent } from 'src/app/shared/components/google-map/google-map.component'
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component'
import { SearchPage } from 'src/app/tabs/search/search.page'

import { SearchPageRoutingModule } from './search-routing.module'

@NgModule( {
  imports     : [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule
  ],
  exports     : [
    SearchInputComponent
  ],
  declarations: [ GoogleMapComponent, SearchPage, SearchInputComponent ]
} )
export class SearchPageModule {}
