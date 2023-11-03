import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core'
import {
	Router,
	RouterLink
} from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { ItemListComponent } from 'src/app/shared/components/item-list/item-list.component'
import { MapService } from 'src/app/shared/services/map.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { UrlService } from 'src/app/shared/services/url.service'

@Component( {
	standalone : true,
	selector   : 'app-trip-details',
	templateUrl: './trip-details.page.html',
	imports    : [
		IonicModule,
		CommonModule,
		AdaptativeButtonComponent,
		DividerComponent,
		ItemListComponent,
		RouterLink
	],
	styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit, ViewDidEnter {

	constructor( private urlService: UrlService,
		private map: MapService,
		private tripService: TripService,
		private router: Router )
	{}

	@ViewChild( 'dmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
	prevHref: string = '/tabs/home'

	async ionViewDidEnter(): Promise<void> {
		await this.map.init( 'detail', this.divElementElementRef.nativeElement )
	}

	async ngOnInit(): Promise<void> {
		this.urlService.previousUrl$.subscribe( ( url ) => {
			this.prevHref = url
		} )

		const state = this.router.getCurrentNavigation()?.extras.state
		const id = state?.['id'] ?? null
		if ( id === null ){
			await this.router.navigate( [ this.prevHref ] )
			return
		}

		const result = await this.tripService.getTripByID( {
			value: id
		} )

		console.log( 'result')
		console.log( result)
	}
}
