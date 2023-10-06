import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { SearchModalComponent } from 'src/app/shared/components/search-modal/search-modal.component'

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

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component: SearchModalComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()
  }
}
