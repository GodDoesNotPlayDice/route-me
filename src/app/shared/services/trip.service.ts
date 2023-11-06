import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Result,
	Some
} from 'oxide.ts'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChatService } from 'src/app/shared/services/chat.service'
import { DriverService } from 'src/app/shared/services/driver.service'
import { LocationService } from 'src/app/shared/services/location.service'
import { Category } from 'src/package/category/domain/models/category'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newCurrency } from 'src/package/shared/domain/models/currency'
import { ValidNumber } from 'src/package/shared/domain/models/valid-number'
import { Street } from 'src/package/street-api/domain/models/street'
import { createTrip } from 'src/package/trip/application/create-trip'
import { getAllTrips } from 'src/package/trip/application/get-all-trips'
import { getTripByID } from 'src/package/trip/application/get-trip-by-id'
import { updateTrip } from 'src/package/trip/application/update-trip'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { TripState } from 'src/package/trip/domain/models/trip-state'
import { TripRepository } from 'src/package/trip/domain/repository/trip-repository'

@Injectable( {
	providedIn: 'root'
} )
export class TripService {
	constructor(
		private tripDao: TripDao,
		private tripRepository: TripRepository,
		private chatService: ChatService,
		private driverService: DriverService,
		private locationService: LocationService,
		private authService: AuthService
	)
	{ }

	async getTripByID( id: TripID ): Promise<Result<Trip, Error[]>> {
		return await getTripByID( this.tripDao, id )
	}

	async getAllTrips(): Promise<Trip[]> {
		const result = await getAllTrips( this.tripDao )

		if ( result.isErr() ) {
			console.log( 'error. get all trip service', result.unwrapErr() )
			return []
		}
		return result.unwrap()
	}

	async getAllByState( state: TripState ): Promise<Trip[]> {
		const result = await this.tripDao.getAllByState( state )

		if ( result.isErr() ) {
			console.log( 'error. get all by state trip service', result.unwrapErr() )
			return []
		}
		return result.unwrap()
	}

	async calculateTripPrice( distance: ValidNumber ): Promise<Option<TripPrice>> {
		// Se asume que se calcula en dolares y luego se transforma a la moneda del usuario
		const result = await this.tripRepository.calculateTripPrice( distance,
			newCurrency( {
				value: 'USD'
			} )
				.unwrap() )
		if ( result.isErr() ) {
			console.log( 'error. calculate trip price. trip service',
				result.unwrapErr() )
			return None
		}
		return Some( result.unwrap() )
	}

	async create( props: {
		startLocation: Street,
		distance: number,
		endLocation: Street,
		startDate: Date
	} ): Promise<boolean> {
		const driver = this.driverService.currentDriver
		if ( driver.isNone() ) {
			console.log( 'driver none' )
			return false
		}

		// const tripPrice = await this.calculateTripPrice()

		const startLocation = await this.locationService.createLocation( {
			name       : props.startLocation.place.value,
			countryCode: props.startLocation.shortCode.value,
			position   : props.startLocation.center
		} )

		if ( startLocation.isNone() ) {
			console.log( 'start loc none' )
			return false
		}

		const endLocation = await this.locationService.createLocation( {
			name       : props.endLocation.place.value,
			countryCode: props.endLocation.shortCode.value,
			position   : props.endLocation.center
		} )

		if ( endLocation.isNone() ) {
			console.log( 'end loc none' )
			return false
		}

		const chat = await this.chatService.createChat()

		if ( chat.isNone() ) {
			console.log( 'chat none' )
			return false
		}


		const result = await createTrip( this.tripDao, {
			startDate    : props.startDate,
			chatID       : chat.unwrap(),
			distance     : props.distance,
			endLocation  : endLocation.unwrap(),
			startLocation: startLocation.unwrap(),
			driver       : driver.unwrap()
		} )

		if ( result.isErr() ) {
			console.log( result.unwrapErr() )
			console.log( 'create fail' )
			return false
		}
		return true
	}

	async updateTrip( trip: Trip, props: {
		description?: string
		category?: Category
		state?: TripState
		queuePassengers?: Passenger[]
		passengers?: Passenger[]
		endDate?: Date
	} ): Promise<boolean>
	{
		const result = await updateTrip( this.tripDao, trip, props )

		if ( result.isErr() ) {
			console.log( 'update trip error' )
			console.log( result.unwrapErr() )
			return false
		}
		return true
	}
}
