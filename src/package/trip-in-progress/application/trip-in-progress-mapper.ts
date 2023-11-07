import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { newPosition } from 'src/package/position-api/domain/models/position'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import {
	locationFromJson,
	locationToJson
} from 'src/package/trip-location/application/location-mapper'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { newTripState } from 'src/package/trip/domain/models/trip-state'

/**
 * Create trip in progress instance from json
 * @throws {EmailInvalidException} - if email is invalid
 */
export const tripInProgressFromJSON = ( json: Record<string, any> ): Result<TripInProgress, Error[]> => {
	const err: Error[] = []

	const id = newTripID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const locationStart = locationFromJson( json['start_location'] )

	if ( locationStart.isErr() ) {
		err.push( ...locationStart.unwrapErr() )
	}

	const locationEnd = locationFromJson( json['end_location'] )

	if ( locationEnd.isErr() ) {
		err.push( ...locationEnd.unwrapErr() )
	}

	const state = newTripState( {
		value: json['state'] ?? ''
	} )

	if ( state.isErr() ) {
		err.push( state.unwrapErr() )
	}

	const pos = newPosition( {
		lng: json['longitude'] ?? '',
		lat: json['latitude'] ?? ''
	} )

	if ( pos.isErr() ){
		err.push( pos.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		id           : id.unwrap(),
		startLocation: locationStart.unwrap(),
		endLocation  : locationEnd.unwrap(),
		status       : state.unwrap(),
		latitude     :pos.unwrap().lat,
		longitude    :pos.unwrap().lng
	} )
}

/**
 * Create trip in progress instance from json
 * @throws {UnknownException} - if unknown error
 */
export const tripInProgressToJSON = ( trip: TripInProgress ): Result<Record<string, any>, Error[]> => {
	try {
		const err: Error[] = []

		const json: Record<string, any> = {
			id       : trip.id.value,
			status   : trip.status,
			latitude : trip.latitude,
			longitude: trip.longitude
		}

		const startLocation = locationToJson( trip.startLocation )

		if ( startLocation.isErr() ) {
			err.push( startLocation.unwrapErr() )
		}
		else {
			json['start_location'] = startLocation.unwrap()
		}

		const endLocation = locationToJson( trip.endLocation )

		if ( endLocation.isErr() ) {
			err.push( endLocation.unwrapErr() )
		}
		else {
			json['end_location'] = endLocation.unwrap()
		}

		if ( err.length > 0 ) {
			return Err( err )
		}

		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error trip in progress to json' )
		return Err( [ err ] )
	}
}
