import {
	Component,
	OnInit
} from '@angular/core'
import {
	NavigationEnd,
	Router
} from '@angular/router'
import { CountryPhoneCodeService } from 'src/app/services/country-phone-code/country-phone-code.service'
import { UrlService } from 'src/app/services/url/url.service'
import {
	Input,
	initTE
} from 'tw-elements'

@Component( {
	selector   : 'app-root',
	templateUrl: 'app.component.html',
	styleUrls  : [ 'app.component.scss' ]
} )
export class AppComponent implements OnInit {

	constructor( private router: Router,
		private countryPhoneCode: CountryPhoneCodeService,
		private urlService : UrlService)
	{}

	ngOnInit() {
		this.router.events.subscribe((val) => {
			if(val instanceof NavigationEnd){
				this.urlService.setPreviousUrl(val.url)
			}
		})

		initTE( { Input } )
	}
}
