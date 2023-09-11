import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { CountryPhoneCodeService } from 'src/app/services/country-phone-code/country-phone-code.service'
import { Country } from 'src/app/shared/models/Country'
import { AppState } from 'src/app/state/app.state'

@Component( {
  selector   : 'app-phone-selector',
  templateUrl: './country-selector.component.html',
  styleUrls  : [ './country-selector.component.scss' ]
} )
export class CountrySelectorComponent {

  constructor( private modalCtrl: ModalController,
    private store: Store<AppState>,
    private countryPhoneCode: CountryPhoneCodeService )
  {
    this.countriesList = this.countryPhoneCode.countriesList
  }

  countriesList : Country[] = []

  selectedCountry : Country | undefined

  cancel() {
    // this.store.dispatch( updateUserRegister( {}))
    return this.modalCtrl.dismiss( false, 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( true, 'confirm' )
  }

  public selectCountry( country: Country ): void {
    this.selectedCountry = country
  }
}
