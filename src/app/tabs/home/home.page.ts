import { CommonModule } from '@angular/common'
import {
	Component,
	OnDestroy
} from '@angular/core'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { Subscription } from 'rxjs'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { CurrencyService } from 'src/app/shared/services/currency.service'
import { NearTripService } from 'src/app/shared/services/near-trip.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { Position } from 'src/package/position-api/domain/models/position'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'
import { FilterButtonData } from 'src/package/shared/domain/components/filter-button-data'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

@Component( {
	standalone : true,
	selector   : 'app-home',
	templateUrl: './home.page.html',
	styleUrls  : [ './home.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		SearchLauncherComponent,
		FilterButtonComponent,
		DriveCardComponent
	]
} )
export class HomePage implements ViewDidEnter, OnDestroy {

	constructor(
		private toastService: ToastService,
		private nearTripService: NearTripService,
		private tripService: TripService,
		private positionService: PositionService,
		private currencyService: CurrencyService
	)
	{}

	info: DriverCardInfo[]     = []
	infoOpen: DriverCardInfo[] = []

	canFetch: boolean = false
	loading: boolean  = false
	errors: boolean   = false

	protected readonly filterButtonList = filterButtonList
	private positionChange: Subscription

	async ngOnDestroy(): Promise<void> {
		this.positionChange.unsubscribe()
	}

	async ionViewDidEnter(): Promise<void> {
		this.canFetch         = true
		const initialPosition = this.positionService.lastPosition

		if ( initialPosition !== null ) {
			await this.loadOpenTrips( initialPosition )

			this.canFetch = false
		}

		this.positionChange =
			this.positionService.newPosition$.subscribe( async value => {
				if ( value !== null && this.canFetch ) {
					await this.loadOpenTrips( value )
					this.canFetch = false
				}
			} )
	}

	private async loadOpenTrips( center: Position ): Promise<void> {
		this.loading = true
		console.log( '-----load open trips-----' )
		const open = await this.tripService.getAllByState( TripStateEnum.Open )

		const result = await this.nearTripService.getNearTrips( center, 10 )

		if ( result.isErr() || open.isErr() ) {
			console.log( 'load open trips err' )
			console.log( result.unwrapErr() )
			this.errors  = true
			this.loading = false
			return
		}
		const currencyResult = await this.currencyService.fetchCurrency()

		this.infoOpen = open.unwrap()
		                    .map( ( trip ): DriverCardInfo => {
			                    const parsedAmount = this.currencyService.parseCurrency(
				                    trip.price.amount.value, currencyResult.unwrap() )

			                    const urlsList: Array<string | null> = trip.passengers.map(
				                    ( passenger ) => {
					                    return passenger.image.isSome()
						                    ? passenger.image.unwrap().value
						                    : ''
				                    } )

			                    const totalSeat       = trip.driver.driverCar.seat.value
			                    const blankUrlsEmptys = totalSeat - 1 -
				                    urlsList.length
			                    for ( let i = 0; i < blankUrlsEmptys; i++ ) {
				                    urlsList.push( null )
			                    }

			                    return {
				                    id               : trip.id.value,
				                    currency         : currencyResult.unwrap().currency,
				                    cost             : parsedAmount,
				                    date             : trip.startDate,
				                    state            : TripStateEnum.Open,
				                    endLocationName  : trip.endLocation.name.value,
				                    startLocationName: trip.startLocation.name.value,
				                    driverAvatar     : {
					                    name: `${ trip.driver.passenger.name.value } ${ trip.driver.passenger.lastName.value }`,
					                    url : trip.driver.passenger.image.isSome()
						                    ? trip.driver.passenger.image.unwrap().value
						                    : ''
				                    },
				                    passengerUrls    : urlsList
			                    }
		                    } )


		this.info    = result.unwrap()
		                     .map( ( trip ): DriverCardInfo => {
			                     const parsedAmount = this.currencyService.parseCurrency(
				                     trip.price.amount.value, currencyResult.unwrap() )

			                     const urlsList: Array<string | null> = trip.passengersImages.map(
				                     ( image ) => {
					                     return image.isSome() ? image.unwrap().value : ''
				                     } )

			                     const totalSeat       = trip.seat.value
			                     const blankUrlsEmptys = totalSeat - 1 -
				                     urlsList.length
			                     for ( let i = 0; i < blankUrlsEmptys; i++ ) {
				                     urlsList.push( null )
			                     }

			                     return {
				                     id               : trip.id.value,
				                     currency         : currencyResult.unwrap().currency,
				                     cost             : parsedAmount,
				                     date             : trip.startDate,
				                     state            : TripStateEnum.Open,
				                     endLocationName  : trip.endLocationName.value,
				                     startLocationName: trip.startLocationName.value,
				                     driverAvatar     : {
					                     name: `${ trip.driverName.value } ${ trip.driverLastName.value }`,
					                     url : trip.driverImage.isSome()
						                     ? trip.driverImage.unwrap().value
						                     : ''
				                     },
				                     passengerUrls    : urlsList
			                     }
		                     } )
		this.loading = false
	}

	async handleRefresh( $event: CustomEvent ): Promise<void> {
		if ( this.positionService.lastPosition !== null ) {
			await this.loadOpenTrips( this.positionService.lastPosition )
		}
		else {
			await this.toastService.presentToast( {
				message : 'No se puede recargar los viajes ahora mismo. Intente mas tarde',
				duration: 1500,
				position: 'bottom'
			} )
		}
		// @ts-ignore
		$event.target.complete()
	}
}

const filterButtonList: FilterButtonData[] = [
	{
		name : 'Comunidad',
		image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png'
	},
	{
		name : 'Eventos',
		image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png'
	},
	{
		name : 'Viajes',
		image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png'
	}
]


