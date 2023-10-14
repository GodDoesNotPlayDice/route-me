import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { debounceTime } from 'rxjs'
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component'
import { LocationService } from 'src/app/shared/services/location.service'
import { StreetService } from 'src/app/shared/services/street.service'
import { Street } from 'src/package/street-api/domain/models/street'
import { StreetsData } from 'src/package/street-api/domain/models/streets-data'

@Component( {
  standalone : true,
  selector   : 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls  : [ './search-modal.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchInputComponent
  ]
} )
export class SearchModalComponent implements OnInit {

  constructor( private modalCtrl: ModalController,
    private streetService: StreetService,
    private locationService: LocationService )
  {}

  @ViewChild( 'search', { static: true } ) inputSearch!: SearchInputComponent
  loading: boolean                   = false
  streetData: StreetsData | null     = null
  selectedStreet: Street | undefined = undefined
  firstTime: boolean                 = false

  cancel() {
    return this.modalCtrl.dismiss( undefined, 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( this.selectedStreet, 'confirm' )
  }

  ngOnInit(): void {
    this.inputSearch.searchText$.pipe( debounceTime( 1000 ) )
        .subscribe(
          async ( searchText ) => {
            if ( searchText.length === 0 ) {
              return
            }
            this.firstTime = true
            this.loading   = true
            const pos      = this.locationService.lastPosition
            if ( pos === null ) {
              return
            }
            const result = await this.streetService.getStreetByTerm( searchText,
              pos )

            if ( result.isErr() ) {
              console.log( 'error search modal' )
              console.log( result.unwrapErr() )
              return
            }

            this.streetData = result.unwrap()

            this.loading    = false
          } )
  }

  async onStreetClick( street: Street ): Promise<void> {
    this.selectedStreet = street
    await this.confirm()
  }
}
