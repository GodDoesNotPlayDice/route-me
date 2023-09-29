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
				const notSelected = newCountryItem( {
					...data,
					selected: false
				} )

				if ( this.lastSelected === undefined ) {
					return notSelected
				}

				if ( this.lastSelected.name.common !== data.name.common ) {
					return notSelected
				}
				else {
					return newCountryItem( {
						...data,
						selected: true
					} )
				}
			} )

		this.countriesList = new Map<string, CountryItem>(
			list.map( ( item ) => [ item.name.common, item ] ) )
	}

	cancel() {
		return this.modalCtrl.dismiss( undefined, 'cancel' )
	}

	confirm() {
		return this.modalCtrl.dismiss( this.lastSelected, 'confirm' )
	}

	public selectCountry( name: string ): void {
		if ( this.lastSelected !== undefined ) {
			const countryEntry = this.countriesList.get( this.lastSelected.name.common )
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

