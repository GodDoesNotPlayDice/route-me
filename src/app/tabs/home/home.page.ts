import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
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
		const resultIP       = await this.ipDao.getIp()
		const resultCurrency = await this.currencyDao.getCurrencyExchange(
			'USD',
			resultIP.unwrap().currency
		)

		this.info    = result.unwrap()
		                     .map( ( trip ): DriverCardInfo => {
			                     const startSplitted             = trip.startLocation.name.value.split(
				                     ',' )
			                     const formatedStartLocationName = `${ startSplitted[0] }, ${ startSplitted[1] }, ${ startSplitted[3] }`
			                     const endSplitted               = trip.endLocation.name.value.split(
				                     ',' )
			                     const formatedEndLocationName   = `${ endSplitted[0] }, ${ endSplitted[1] }, ${ endSplitted[3] }`
			                     const amountUSD                 = trip.price.amount.value
			                     const targetAmount              = amountUSD *
				                     resultCurrency.unwrap().value
			                     const parsedAmount              = new Intl.NumberFormat(
				                     resultIP.unwrap().languages[0], {
					                     style   : 'currency',
					                     currency: resultIP.unwrap().currency
				                     } ).format( targetAmount )

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
				                     currency         : resultIP.unwrap().currency,
				                     cost             : parsedAmount,
				                     date             : trip.startDate.toLocaleString(),
				                     state            : trip.state,
				                     endLocationName  : formatedEndLocationName,
				                     startLocationName: formatedStartLocationName,
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
