import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { CurrencyService } from 'src/app/shared/services/currency.service'
import { PassengerTripService } from 'src/app/shared/services/passenger-trip.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripHistoryService } from 'src/app/shared/services/trip-history.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

@Component( {
	standalone : true,
	selector   : 'app-trip-history',
	templateUrl: './trip-history.page.html',
	styleUrls  : [ './trip-history.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		DriveCardComponent
	]
} )
export class TripHistoryPage implements ViewDidEnter {

	constructor(
		private toastService: ToastService,
		private currencyService: CurrencyService,
		private authService: AuthService,
		private tripService: TripService,
		private tripHistoryService: TripHistoryService,
		private passengerTripService: PassengerTripService
	)
	{}

	openTrips: DriverCardInfo[]      = []
	progressTrips: DriverCardInfo[]  = []
	completedTrips: DriverCardInfo[] = []

	openLoading: boolean      = false
	progressLoading: boolean  = false
	completedLoading: boolean = false

	openLoadError: boolean      = false
	progressLoadError: boolean  = false
	completedLoadError: boolean = false

	async ionViewDidEnter(): Promise<void> {
		this.openLoading      = true
		this.progressLoading  = true
		this.completedLoading = true

		const currencyResult = await this.currencyService.fetchCurrency()

		if ( currencyResult.isErr() ) {
			console.log( currencyResult.unwrapErr() )
			console.log( 'Error fetching currency. trip history' )
			await this.toastService.presentToast( {
				message : 'Error en la conexion. Intente mas tarde',
				duration: 1500,
				position: 'bottom'
			} )
			// this.openLoadError      = true
			// this.progressLoadError  = true
			// this.completedLoadError = true
			return
		}

		const activeTrips = await this.passengerTripService.getAllByEmail(
			this.authService.currentPassenger.unwrap().email )

		if ( activeTrips.isOk() ) {
			for ( const passengerTrip of activeTrips.unwrap() ) {
				const tripResult = await this.tripService.getTripByID(
					passengerTrip.tripID )

				if ( tripResult.isErr() ) {
					console.log( tripResult.unwrapErr() )
					break
				}
				const trip = tripResult.unwrap()

				if ( trip.state === TripStateEnum.Open ) {
					this.openTrips.push( {
						id               : trip.id.value,
						cost             : this.currencyService.parseCurrency(
							trip.price.amount.value, currencyResult.unwrap() ),
						currency         : currencyResult.unwrap().currency,
						date             : trip.startDate,
						startLocationName: trip.startLocation.name.value,
						endLocationName  : trip.endLocation.name.value,
						state            : trip.state,
						passengerUrls    : trip.passengers.map(
							passenger => passenger.image.isSome()
								? passenger.image.unwrap().value
								: '' ),
						driverAvatar     : {
							url : trip.driver.passenger.image.isSome()
								? trip.driver.passenger.image.unwrap().value
								: '',
							name: `${ trip.driver.passenger.name.value } ${ trip.driver.passenger.lastName.value }`
						}
					} )
				}
				else if ( trip.state === TripStateEnum.Progress ) {
					this.progressTrips.push( {
						id               : trip.id.value,
						cost             : this.currencyService.parseCurrency(
							trip.price.amount.value, currencyResult.unwrap() ),
						currency         : currencyResult.unwrap().currency,
						date             : trip.startDate,
						startLocationName: trip.startLocation.name.value,
						endLocationName  : trip.endLocation.name.value,
						state            : trip.state,
						passengerUrls    : trip.passengers.map(
							passenger => passenger.image.isSome()
								? passenger.image.unwrap().value
								: '' ),
						driverAvatar     : {
							url : trip.driver.passenger.image.isSome()
								? trip.driver.passenger.image.unwrap().value
								: '',
							name: `${ trip.driver.passenger.name.value } ${ trip.driver.passenger.lastName.value }`
						}
					} )
				}
			}
		}
		else {
			console.log( 'active trips err' )
			console.log( activeTrips.unwrapErr() )
			// this.openLoadError     = true
			// this.progressLoadError = true
		}

		this.openLoading     = false
		this.progressLoading = false

		const completedTripsResult = await this.tripHistoryService.getAll(
			this.authService.currentPassenger.unwrap().email )

		if ( completedTripsResult.isOk() ) {
			for ( const tripHistory of completedTripsResult.unwrap() ) {
				this.completedTrips.push( {
					id               : tripHistory.trip.id.value,
					cost             : this.currencyService.parseCurrency(
						tripHistory.trip.price.amount.value, currencyResult.unwrap() ),
					currency         : currencyResult.unwrap().currency,
					date             : tripHistory.trip.startDate,
					startLocationName: tripHistory.trip.startLocation.name.value,
					endLocationName  : tripHistory.trip.endLocation.name.value,
					state            : tripHistory.trip.state,
					passengerUrls    : tripHistory.trip.passengers.map(
						passenger => passenger.image.isSome()
							? passenger.image.unwrap().value
							: '' ),
					driverAvatar     : {
						url : tripHistory.trip.driver.passenger.image.isSome()
							? tripHistory.trip.driver.passenger.image.unwrap().value
							: '',
						name: `${ tripHistory.trip.driver.passenger.name.value } ${ tripHistory.trip.driver.passenger.lastName.value }`
					}
				} )
			}
		}
		else {
			console.log( 'completed trips err' )
			console.log( completedTripsResult.unwrapErr() )
			// this.completedLoadError = true
		}
		this.completedLoading = false
	}
}
