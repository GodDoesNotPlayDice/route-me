import { CommonModule } from '@angular/common'
import {
	Component,
	OnInit
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CountryPhoneCodeService } from 'src/app/shared/services/country-phone-code.service'
import {
	Dropdown,
	initTE,
	Input,
	Ripple
} from 'tw-elements'

@Component( {
	standalone : true,
	selector   : 'app-root',
	templateUrl: 'app.component.html',
	imports    : [
		IonicModule,
		CommonModule
	],
	styleUrls  : [ 'app.component.scss' ]
} )
export class AppComponent implements OnInit {
	constructor(
		private countryPhoneCode: CountryPhoneCodeService )
	{}

	async ngOnInit() {
		// await this.countryPhoneCode.init()
		initTE( { Input, Dropdown, Ripple } )
	}
}
