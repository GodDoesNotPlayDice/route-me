import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { SearchInputComponent } from '..'

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
export class SearchModalComponent {

  constructor( private modalCtrl: ModalController ) {}

  cancel() {
    return this.modalCtrl.dismiss( false, 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( true, 'confirm' )
  }

}
