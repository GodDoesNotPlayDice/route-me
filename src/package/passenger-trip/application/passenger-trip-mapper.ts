import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PassengerTrip } from 'src/package/passenger-trip/domain/models/passenger-trip'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { newTripState } from 'src/package/trip/domain/models/trip-state'

/**
 * Create a trip instance from json
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {TripIdInvalidException} - if id is invalid
 */
export const passengerTripFromJSON = ( json: Record<string, any> ): Result<PassengerTrip, Error[]> => {
	const err: Error[] = []
	const id           = newTripID( {
		value: json['trip_id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const userEmail = newEmail( {
		value: json['user_email'] ?? ''
	} )

	if ( userEmail.isErr() ) {
		err.push( userEmail.unwrapErr() )
	}

	const state = newTripState( {
		value: json['state'] ?? ''
	} )

	if ( state.isErr() ) {
		err.push( state.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		tripID   : id.unwrap(),
		userEmail: userEmail.unwrap(),
		state    : state.unwrap()
	} )
}

/**
 * Create passenger trip instance from json
 * @throws {UnknownException} - if unknown error
 */
export const passengerTripToJSON = ( passengerTrip: PassengerTrip ): Result<Record<string, any>, Error[]> => {
	try {
		const json: Record<string, any> = {
			trip_id   : passengerTrip.tripID.value,
			user_email: passengerTrip.userEmail.value,
			state     : passengerTrip.state
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error passenger trip to json' )
		return Err( [ err ] )
	}
}
