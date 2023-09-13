import {
	Component,
	OnInit
} from '@angular/core'
import { Router } from '@angular/router'
import { UrlService } from 'src/app/services/url/url.service'

@Component( {
	selector   : 'app-trip-details',
	templateUrl: './trip-details.page.html',
	styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit{

	constructor( private urlService: UrlService,
	private router : Router) {}

	prevHref: string = '/tabs/home'

	public ngOnInit(): void {
		this.urlService.previousUrl$.subscribe( ( url ) => {
			this.prevHref = url
		})

		console.log(this.router.getCurrentNavigation()?.extras.state)
	}
}
