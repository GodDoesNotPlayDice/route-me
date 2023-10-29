import {
	Err,
	None,
	Ok,
	Result
} from 'oxide.ts'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Driver } from 'src/package/driver/domain/models/driver'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { newEndTripDate } from 'src/package/trip/domain/models/end-trip-date'
import { Trip } from 'src/package/trip/domain/models/trip'
import { newTripDescription } from 'src/package/trip/domain/models/trip-description'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { newTripState } from 'src/package/trip/domain/models/trip-state'
import { ulid } from 'ulidx'

export const createTrip = async ( dao: TripDao,
	props: {
		driver: Driver,
		chatID: ChatID,
		startDate: Date,
		startLocation: TripLocation
		endLocation: TripLocation
		price: TripPrice,
	}
): Promise<Result<Trip, Error[]>> => {
	const err: Error[] = []

	const id = newTripID( {
		value: ulid()
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const end = newEndTripDate( {
		value: props.startDate
	} )

	if ( end.isErr() ) {
		err.push( end.unwrapErr() )
	}

	const startDate = newValidDate( {
		value: props.startDate
	} )

	if ( startDate.isErr() ) {
		err.push( startDate.unwrapErr() )
	}

	const description = newTripDescription( {
		value: ''
	} )

	if ( description.isErr() ) {
		err.push( description.unwrapErr() )
	}

	const state = newTripState( {
		value: 'Open'
	} )

	if ( state.isErr() ) {
		err.push( state.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const result: Trip = {
		id           : id.unwrap(),
		driver       : props.driver,
		chatID       : props.chatID,
		endLocation  : props.endLocation,
		startLocation: props.startLocation,
		price        : props.price,
		startDate    : startDate.unwrap().value,
		endDate      : end.unwrap().value,
		description  : description.unwrap(),
		state        : state.unwrap(),
		passengers   : [],
		category     : None
	}

	const response = await dao.create( result )

	if ( response.isErr() ) {
		err.push( ...response.unwrapErr() )
		return Err( err )
	}

	return Ok( result )
}
