import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild
} from '@angular/core'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { InputTextComponent } from '../../shared/components/input-text/input-text.component'
import { MapBoxComponent } from '../../shared/components/map-box/map-box.component'
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component'

@Component( {
  standalone : true,
  selector   : 'app-search',
  templateUrl: './search.page.html',
  styleUrls  : [ './search.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchInputComponent,
    MapBoxComponent,
    InputTextComponent
  ]
} )
export class SearchPage implements ViewDidEnter {

  constructor() { }

  @ViewChild( 'search' ) searchInput!: SearchInputComponent
  @ViewChild( MapBoxComponent ) mapBox!: MapBoxComponent

  ionViewDidEnter(): void {
    // this.searchInput.inputSearch.nativeElement.focus()
    this.mapBox.ionViewDidEnter()
  }
}
