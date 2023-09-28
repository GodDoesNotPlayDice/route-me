import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { SearchModalComponent } from '..'

@Component( {
  standalone : true,
  selector   : 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls  : [ './search-bar.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class SearchBarComponent {
  constructor( private modalCtrl: ModalController ) {}

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component: SearchModalComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()
  }
}
