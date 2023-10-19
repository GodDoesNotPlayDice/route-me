import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChatService } from 'src/app/shared/services/chat.service'
import { LocationService } from 'src/app/shared/services/location.service'
import { Position } from 'src/package/position-api/domain/models/position'
import { Street } from 'src/package/street-api/domain/models/street'
import { createTrip } from 'src/package/trip/application/create-trip'
import { getAllTrips } from 'src/package/trip/application/get-all-trips'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
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
		private locationService: LocationService,
		private authService: AuthService
	)
	{ }

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

	async calculateTripPrice( start: Position,
		end: Position ): Promise<Option<TripPrice>> {
		const result = await this.tripRepository.calculateTripPrice( start, end )
		if ( result.isErr() ) {
			return None
		}
		return Some( result.unwrap() )
	}

	async create( props: {
		startLocation: Street,
		endLocation: Street,
		startDate: Date
	} ): Promise<boolean> {
		const driver = this.authService.currentDriver

		if ( driver.isNone() ) {
			return false
		}

		const tripPrice = await this.calculateTripPrice(
			props.startLocation.center,
			props.endLocation.center
		)

		if ( tripPrice.isNone() ) {
			return false
		}

		const startLocation = await this.locationService.createLocation( {
			name       : props.startLocation.place.value,
			countryCode: props.startLocation.shortCode.value,
			position   : props.startLocation.center
		} )

		if ( startLocation.isNone() ) {
			return false
		}

		const endLocation = await this.locationService.createLocation( {
			name       : props.endLocation.place.value,
			countryCode: props.endLocation.shortCode.value,
			position   : props.endLocation.center
		} )

		if ( endLocation.isNone() ) {
			return false
		}

		const chat = await this.chatService.createChat()

		if ( chat.isNone() ) {
			return false
		}

		const result = await createTrip( this.tripDao, {
			startDate    : props.startDate,
			chatID       : chat.unwrap(),
			price        : tripPrice.unwrap(),
			endLocation  : endLocation.unwrap(),
			startLocation: startLocation.unwrap(),
			driver       : driver.unwrap()
		} )

		if ( result.isErr() ) {
			return false
		}
		return true
	}
}
