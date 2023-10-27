import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'
import { newTripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'
import {
	tripFromJSON,
	tripToJSON
} from 'src/package/trip/application/trip-mapper'
import { Trip } from 'src/package/trip/domain/models/trip'

/**
 * Create a json from trip history instance
 * @throws {UnknownException} - if unknown error
 */
export const tripHistoryToJson = ( tripHistory: TripHistory ): Result<Record<string, any>, Error[]> => {
	try {
		const err: Error[] = []

		const json: Record<string, any> = {
			id: tripHistory.id.value
		}

		const trips: Record<string, any>[] = []
		for ( const trip of tripHistory.trips ) {
			const tripResult = tripToJSON( trip )

			if ( tripResult.isErr() ) {
				err.push( ...tripResult.unwrapErr() )
			}
			else {
				trips.push( tripResult.unwrap() )
			}
		}

		if ( trips.length > 0 ) {
			json['trips'] = trips
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

	const trips: Trip[] = []

	if ( json['trips'] !== undefined ) {
		for ( const trip of Object.values( json['trips'] ) ) {
			const tripResult = tripFromJSON( trip as Record<string, any> )

			if ( tripResult.isErr() ) {
				error.push( ...tripResult.unwrapErr() )
			}
			else {
				trips.push( tripResult.unwrap() )
			}
		}
	}

	if ( error.length > 0 ) {
		return Err( error )
	}

	return Ok( {
		id   : id.unwrap(),
		trips: trips
	} )
}
