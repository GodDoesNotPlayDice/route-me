import {
	Err,
	Ok,
	Result,
	Some
} from 'oxide.ts'
import { Category } from 'src/package/category/domain/models/category'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export const updateTrip = async ( dao: TripDao,
	trip: Trip, props: {
		description?: string
		category?: Category
		driver?: Driver
		state?: TripState
		queuePassengers?: Passenger[]
		passengers?: Passenger[]
		endDate?: Date
	} ): Promise<Result<Trip, Error[]>> => {

	const description = newPassengerDescription( {
		value: props.description ?? trip.description.value
	} )

	if ( description.isErr() ) {
		return Err( [ description.unwrapErr() ] )
	}

	const newTrip: Trip = {
		id             : trip.id,
		description    : description.unwrap(),
		category       : props.category === undefined ? trip.category : Some(
			props.category ),
		feeMethod      : trip.feeMethod,
		chatID         : trip.chatID,
		endLocation    : trip.endLocation,
		price          : trip.price,
		startDate      : trip.startDate,
		startLocation  : trip.startLocation,
		driver         : props.driver ?? trip.driver,
		state          : props.state ?? trip.state,
		queuePassengers: props.queuePassengers ?? trip.queuePassengers,
		passengers     : props.passengers ?? trip.passengers,
		endDate        : props.endDate ?? trip.endDate
	}

	const result = await dao.update( newTrip )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( newTrip )
}
