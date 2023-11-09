import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnDestroy,
	ViewChild
} from '@angular/core'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component'
import { MapService } from 'src/app/shared/services/map.service'
import { NearTripService } from 'src/app/shared/services/near-trip.service'
import { ulid } from 'ulidx'

@Component( {
	standalone : true,
	selector   : 'app-search',
	templateUrl: './search.page.html',
	styleUrls  : [ './search.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		SearchInputComponent,
		InputTextComponent
	]
} )
export class SearchPage implements ViewDidEnter, OnDestroy {

	constructor(
		private map: MapService,
		private nearTripService: NearTripService
	) {}

	@ViewChild( 'search' ) searchInput!: SearchInputComponent
	@ViewChild( 'smap' ) divElementElementRef!: ElementRef<HTMLDivElement>

//TODO: tomar near trips (pasarlos a home tambien)
	async ionViewDidEnter(): Promise<void> {
		await this.map.init( 'search', this.divElementElementRef.nativeElement )

		// const c1 = await this.nearTripService.create({
		// 	id: {
		// 		value: ulid()
		// 	},
		// 	endLocationName:{
		// 		value: 'name end'
		// 	},
		// 	startLocationName:{
		// 		value: 'name start'
		// 	},
		// 	latitude: -33.030484,
		// 	longitude: -71.537360,
		// 	price:{
		// 		amount:{
		// 			value: 100
		// 		},
		// 		currency:{
		// 			value: 'USD'
		// 		}
		// 	},
		// 	startDate: {
		// 		value: new Date()
		// 	}
		// })

		const result = await this.nearTripService.getNearTrips({lat: -33.030484, lng: -71.537360}, 2)
		console.log('result', result)
	}

	async ngOnDestroy(): Promise<void> {
		await this.map.removeMap( 'search' )
	}
}
