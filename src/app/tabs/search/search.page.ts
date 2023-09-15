import {Component, ViewChild} from '@angular/core';
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { GoogleMapComponent } from 'src/app/shared/components/google-map/google-map.component'
import {
  SearchInputComponent
} from "../../shared/components/search-input/search-input.component";
import { CommonModule } from '@angular/common';

@Component( {
  standalone : true,
  selector   : 'app-search',
  templateUrl: './search.page.html',
  styleUrls  : [ './search.page.scss' ],
  imports: [
    IonicModule,
    CommonModule,
    SearchInputComponent,
    GoogleMapComponent
  ]
})
export class SearchPage implements ViewDidEnter {

  constructor() { }

  @ViewChild('search') searchInput! : SearchInputComponent

  ionViewDidEnter(): void {
    this.searchInput.inputSearch.nativeElement.focus()
  }
}
