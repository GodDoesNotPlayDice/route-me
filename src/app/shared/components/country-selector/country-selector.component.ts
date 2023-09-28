import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  OnInit
} from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import {
  CountryItem,
  newCountryItem
} from 'src/app/shared/models'
import { DividerComponent } from '..'
import { CountryPhoneCodeService } from '../../services'

@Component( {
  standalone : true,
  selector   : 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls  : [ './country-selector.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    DividerComponent
  ]
} )
export class CountrySelectorComponent implements OnInit {

  constructor( private modalCtrl: ModalController,
    private countryPhoneCode: CountryPhoneCodeService )
  {}

  @Input() lastSelected: CountryItem | undefined
  countriesList = new Map<string, CountryItem>()

  ngOnInit() {
    const list: CountryItem[] = this.countryPhoneCode.countriesList.map(
      ( data ) =>
      {
        const notSelected = newCountryItem({
          image   : data.flags.png,
          name    : data.name.common,
          cca     : data.cca2,
          selected: false
        })

        if ( this.lastSelected === undefined ) {
          return notSelected
        }

        if ( this.lastSelected.name !== data.name.common ) {
          return notSelected
        }
        else {
          return newCountryItem({
            image   : data.flags.png,
            cca     : data.cca2,
            name    : data.name.common,
            selected: true
          })
        }
      } )

    this.countriesList = new Map<string, CountryItem>(
      list.map( ( item ) => [ item.name, item ] ) )
  }

  cancel() {
    return this.modalCtrl.dismiss( undefined, 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( this.lastSelected, 'confirm' )
  }

  public selectCountry( name: string ): void {
    if ( this.lastSelected !== undefined ) {
      const countryEntry = this.countriesList.get( this.lastSelected.name )
      if ( countryEntry !== undefined ) {
        countryEntry.selected = false
      }
    }

    const countrySelected = this.countriesList.get( name )
    if ( countrySelected !== undefined ) {

      countrySelected.selected = true
      this.lastSelected        = countrySelected
    }
  }
}

