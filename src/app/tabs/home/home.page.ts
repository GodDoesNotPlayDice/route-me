import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { CurrencyService } from 'src/app/shared/services/currency.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { CurrencyDao } from 'src/package/currency-api/domain/dao/currency-dao'
import { IpDao } from 'src/package/ip-api/domain/dao/ip-dao'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'
import { FilterButtonData } from 'src/package/shared/domain/components/filter-button-data'
import { TripNotMatchStateException } from 'src/package/trip/domain/exceptions/trip-not-match-state-exception'
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
export class HomePage implements ViewDidEnter {

	constructor( private trip: TripService,
		private router: Router,
		private currencyService: CurrencyService,
		private ipDao: IpDao, private currencyDao: CurrencyDao )
	{}


	info: DriverCardInfo[] = []

	loading: boolean = false
	errors: boolean  = false

	protected readonly filterButtonList = filterButtonList

	async ionViewDidEnter(): Promise<void> {
		await this.loadOpenTrips()
	}

	private async loadOpenTrips(): Promise<void> {
		this.loading = true
		const result = await this.trip.getAllByState( TripStateEnum.Open )

		if ( result.isErr() ) {
			const notMatch = result.unwrapErr()
			                       .some( ( err ) => err instanceof
				                       TripNotMatchStateException )
			if ( !notMatch ) {
				this.errors = true
			}
			this.loading = false
			return
		}
		const currencyResult = await this.currencyService.fetchCurrency()

		this.info    = result.unwrap()
		                     .map( ( trip ): DriverCardInfo => {
			                     const parsedAmount = this.currencyService.parseCurrency(
				                     trip.price.amount.value, currencyResult.unwrap() )

			                     const urlsList = trip.passengers.map(
				                     ( passenger ) => {
					                     return passenger.image.value
				                     } )

			                     const totalSeat       = trip.driver.driverCar.seat.value
			                     const blankUrlsEmptys = totalSeat - 1 -
				                     urlsList.length
			                     for ( let i = 0; i < blankUrlsEmptys; i++ ) {
				                     urlsList.push( '' )
			                     }

			                     return {
				                     id               : trip.id.value,
				                     currency         : currencyResult.unwrap().currency,
				                     cost             : parsedAmount,
				                     date             : trip.startDate,
				                     state            : trip.state,
				                     endLocationName  : trip.endLocation.name.value,
				                     startLocationName: trip.startLocation.name.value,
				                     driverAvatar     : {
					                     name: trip.driver.passenger.name.value,
					                     url : trip.driver.passenger.image.value
				                     },
				                     passengerUrls    : urlsList
			                     }
		                     } )
		this.loading = false
	}

	async handleRefresh( $event: CustomEvent ): Promise<void> {
		await this.loadOpenTrips()
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


