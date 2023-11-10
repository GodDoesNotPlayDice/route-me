import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'
import { newTripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'
import {
	tripFromJSON,
	tripToJSON
} from 'src/package/trip/application/trip-mapper'

/**
 * Create a json from trip history instance
 * @throws {UnknownException} - if unknown error
 */
export const tripHistoryToJson = ( tripHistory: TripHistory ): Result<Record<string, any>, Error[]> => {
	try {
		const err: Error[] = []

		const json: Record<string, any> = {
			id        : tripHistory.id.value,
			user_email: tripHistory.userEmail.value
		}

		const trip = tripToJSON( tripHistory.trip )

		if ( trip.isErr() ) {
			err.push( ...trip.unwrapErr() )
		}
		else {
			json['trip'] = trip.unwrap()
		}

		if ( err.length > 0 ) {
			return Err( err )
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error trip history to json' )
		return Err( [ err ] )
	}
}

/**
 * Create a trip history instance
 * @throws {TripHistoryIdInvalidException} - if id is invalid
 * @throws {DriverIdInvalidException} - if driver id is invalid
 * @throws {CategoryIdInvalidException} - if category id is invalid
 * @throws {ChatIdInvalidException} - if chat id is invalid
 * @throws {TripLocationIdInvalidException} - if location id is invalid
 * @throws {MoneyInvalidException} - if money is invalid
 * @throws {TripStateInvalidException} - if state is invalid
 * @throws {TripIdInvalidException} - if trip id is invalid
 * @throws {DateInvalidException} - if date is invalid
 * @throws {TripDescriptionInvalidException} - if description is invalid
 * @throws {UserIdInvalidException} - if passenger id is invalid
 * @throws {CurrencyInvalidException} - if currency is invalid
 */
export const tripHistoryFromJson = ( json: Record<string, any> ): Result<TripHistory, Error[]> => {
	const error: Error[] = []

	const id = newTripHistoryID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		error.push( id.unwrapErr() )
	}

	const email = newEmail( {
		value: json['user_email'] ?? ''
	} )

	if ( email.isErr() ) {
		error.push( email.unwrapErr() )
	}

	const trip = tripFromJSON( json['trip'] )

	if ( trip.isErr() ) {
		error.push( ...trip.unwrapErr() )
	}

	if ( error.length > 0 ) {
		return Err( error )
	}

	return Ok( {
		id       : id.unwrap(),
		userEmail: email.unwrap(),
		trip     : trip.unwrap()
	} )
}
