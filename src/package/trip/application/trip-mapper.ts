import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { newCategoryID } from 'src/package/category/domain/models/category-id'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { newLocationID } from 'src/package/location/domain/models/location-id'
import {
	newPassengerID,
	PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import { dateToJSON } from 'src/package/shared/config/helper/date/date-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import {
	newTrip,
	Trip
} from 'src/package/trip/domain/models/trip'

/**
 * Create a trip instance from json
 * @throws {DateInvalidException} - if date is invalid
 * @throws {TripIdInvalidException} - if id is invalid
 * @throws {TripDescriptionInvalidException} - if description is invalid
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {DriverIdInvalidException} - if id is invalid
 * @throws category
 * @throws chat
 * @throws {LocationIdInvalidException} - if id is invalid
 */
export const tripFromJSON = ( json: Record<string, any> ): Result<Trip, Error[]> => {
	const err: Error[] = []

	const passenger: PassengerID[] = []
	for ( const id of Object.values( json['passengers'] ) ) {
		const passengerIDResult = newPassengerID( {
			value: id as string
		} )
		if ( passengerIDResult.isErr() ) {
			err.push( passengerIDResult.unwrapErr() )
		}
		else {
			passenger.push( passengerIDResult.unwrap() )
		}
	}

	if ( err.length > 0 ) {
		return Err( err )
	}
	const driverIDResult = newDriverID( {
		value: json['driverID']
	} )

	if ( driverIDResult.isErr() ) {
		err.push( driverIDResult.unwrapErr() )
	}

	const categoryResult = newCategoryID( {
		value: json['category']
	} )

	const chatResult = newChatID( {
		value: json['chat']
	} )

	const locationStart = newLocationID( {
		value: json['startLocationID']
	} )

	if ( locationStart.isErr() ) {
		err.push( locationStart.unwrapErr() )
	}

	const locationEnd = newLocationID( {
		value: json['endLocationID']
	} )

	if ( locationEnd.isErr() ) {
		err.push( locationEnd.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const result = newTrip( {
		driverID       : driverIDResult.unwrap(),
		category       : categoryResult,
		chat           : chatResult,
		passengers     : passenger,
		id             : json['id'],
		description    : json['description'],
		startDate      : new Date( json['startDate'] ),
		endDate        : new Date( json['endDate'] ),
		startLocationID: locationStart.unwrap(),
		endLocationID  : locationEnd.unwrap()
	} )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}

/**
 * Create a trip instance from json
 * @throws {UnknownException} - if unknown error
 */
export const tripToJSON = ( trip: Trip ): Result<Record<string, any>, Error> => {

	try {
		const passengers = trip.passengersID.map(
			( passengers: PassengerID ) => {
				return passengers.value
			} )

		return Ok({
				id           : trip.id.value,
				description  : trip.description.value,
				driverID     : trip.driverID.value,
				passengers   : passengers,
				category     : trip.categoryID.value,
				chat         : trip.chatID.value,
				startDate    : dateToJSON( trip.startDate ),
				endDate      : dateToJSON( trip.endDate ),
				startLocation: trip.startLocation.value,
				endLocation  : trip.endLocation.value
			}
		)
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error driver to json' )
		return Err( err )
	}
}
