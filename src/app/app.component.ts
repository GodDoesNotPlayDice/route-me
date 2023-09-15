import { CommonModule } from '@angular/common'
import {
  Component,
  EnvironmentInjector,
  inject,
  OnInit
} from '@angular/core'
import {
	NavigationEnd,
	Router
} from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { CountryPhoneCodeService } from 'src/app/services/country-phone-code/country-phone-code.service'
import { UrlService } from 'src/app/services/url/url.service'
import {
	Input,
	initTE
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
  public environmentInjector = inject(EnvironmentInjector);

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
