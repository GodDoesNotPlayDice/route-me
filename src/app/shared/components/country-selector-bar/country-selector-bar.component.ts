import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { CountryItem } from 'src/app/shared/models'
import {
  AppState,
  updatePassengerRegister
} from 'src/app/shared/state'
import { CountrySelectorComponent } from '..'

@Component( {
  standalone : true,
  selector   : 'app-country-selector-bar',
  templateUrl: './country-selector-bar.component.html',
  styleUrls  : [ './country-selector-bar.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    MatInputModule,
    MatSelectModule
  ]
} )
export class CountrySelectorBarComponent {

  constructor( private modalCtrl: ModalController,
    private store: Store<AppState> )
  {}

  lastSelected: CountryItem | undefined
  label: string = 'Ingresar Pais'

  readonly countryControl = new FormControl( '', control => {
    if ( control.value === '' ) {
      return { required: true }
    }
    return null
  } )

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component     : CountrySelectorComponent,
      componentProps: {
        lastSelected: this.lastSelected
      }
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    this.lastSelected = data

    if ( this.lastSelected !== undefined ) {
      this.label = this.lastSelected.name

      this.store.dispatch( updatePassengerRegister( {
        country: this.lastSelected.cca
      } ) )

      this.countryControl.patchValue( this.lastSelected.cca )
      this.countryControl.updateValueAndValidity()
    }
  }
}
