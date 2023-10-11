import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { SearchModalComponent } from 'src/app/shared/components/search-modal/search-modal.component'
import { Position } from 'src/package/location-api/domain/models/position'
import { Street } from 'src/package/street-api/domain/models/street'

@Component( {
  standalone : true,
  selector   : 'app-search-launcher',
  templateUrl: './search-launcher.component.html',
  styleUrls  : [ './search-launcher.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchModalComponent
  ]
} )
export class SearchLauncherComponent {
  constructor( private modalCtrl: ModalController ) {}

  streetSearch: Street | undefined = undefined
  @Input() value: string           = ''
  @Output() onStreetPosition: EventEmitter<Street> = new EventEmitter<Street>()


  async openModal() {
    const modal = await this.modalCtrl.create( {
      component: SearchModalComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()
    if ( data === undefined ) {
      return
    }
    this.streetSearch     = data
    this.value = this.streetSearch!.place_name
    this.onStreetPosition.emit( this.streetSearch!)
  }
}
