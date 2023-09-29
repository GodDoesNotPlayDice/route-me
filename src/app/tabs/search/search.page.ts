import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component'
import { MapService } from 'src/app/shared/services'

@Component( {
  standalone : true,
  selector   : 'app-search',
  templateUrl: './search.page.html',
  styleUrls  : [ './search.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchInputComponent,
    InputTextComponent
  ]
} )
export class SearchPage implements ViewDidEnter {

  constructor( private map: MapService ) {}
  @ViewChild( 'search' ) searchInput!: SearchInputComponent
  @ViewChild( 'smap' ) divElementElementRef!: ElementRef<HTMLDivElement>

  ionViewDidEnter(): void {
    // this.searchInput.inputSearch.nativeElement.focus()
    	this.map.init('search', this.divElementElementRef.nativeElement)
  }
}
