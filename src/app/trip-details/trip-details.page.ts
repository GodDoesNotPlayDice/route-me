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
import { ParseLocationNamePipe } from 'src/app/shared/pipes/parse-location-name.pipe'
import { AlertService } from 'src/app/shared/services/alert.service'
import { MapService } from 'src/app/shared/services/map.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { UrlService } from 'src/app/shared/services/url.service'
import { Trip } from 'src/package/trip/domain/models/trip'

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
		RouterLink,
		ParseLocationNamePipe
	],
	styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit, ViewDidEnter {

	constructor( private urlService: UrlService,
		private map: MapService,
		private tripService: TripService,
		private alertService: AlertService,
		private router: Router )
	{}

	@ViewChild( 'dmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
	prevHref: string  = '/tabs/home'
	trip: Trip | null = null
	loading : boolean = false

	async ionViewDidEnter(): Promise<void> {
		await this.map.init( 'detail', this.divElementElementRef.nativeElement )
	}

	async ngOnInit(): Promise<void> {
		this.urlService.previousUrl$.subscribe( ( url ) => {
			this.prevHref = url
		} )

		this.loading = true
		const state = this.router.getCurrentNavigation()?.extras.state
		const id    = state?.['id'] ?? null
		if ( id === null ) {
			await this.router.navigate( [ this.prevHref ] )
			return
		}

		const result = await this.tripService.getTripByID( {
			value: id
		} )

		if ( result.isErr() ) {
			await this.alertService.presentAlert( {
				header : 'Fallo al cargar el viaje',
				message: `Intente nuevamente`,
				buttons: [
					{
						text   : 'Devolverse',
						handler: async () => {
							await this.router.navigate( [ this.prevHref ] )
						}
					}
				]
			} )
		}
		else {
			this.trip = result.unwrap()
		}
		this.loading = false
	}

	async onChatClick(): Promise<void> {
		if ( this.trip === null ) return
		await this.router.navigate( [ '/chat' ], {
			state: {
				tripID: this.trip.id.value,
				chatID: this.trip.chatID.value,
			}
		})
	}
}
