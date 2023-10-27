import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { newPosition } from 'src/package/position-api/domain/models/position'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Street } from 'src/package/street-api/domain/models/street'
import { newStreetName } from 'src/package/street-api/domain/models/street-name'
import { newStreetPlace } from 'src/package/street-api/domain/models/street-place'
import { newStreetShortCode } from 'src/package/street-api/domain/models/street-short-code'

/**
 * Create a street instance from json
 * @throws {StreetNameInvalidException} - if some name is invalid
 * @throws {StreetPlaceInvalidException} - if some place is invalid
 * @throws {PositionInvalidException} - if some position is invalid
 */
export const streetFromJson = ( json: Record<string, any> ): Result<Street, Error[]> => {
	const err: Error[] = []

	const positionResult = newPosition( {
		lat: json['center'][1],
		lng: json['center'][0]
	} )

	if ( positionResult.isErr() ) {
		err.push( positionResult.unwrapErr() )
	}

	const place = newStreetPlace( {
		value: json['place_name'] ?? ''
	} )

	if ( place.isErr() ) {
		err.push( place.unwrapErr() )
	}

	const name = newStreetName( {
		value: json['text'] ?? ''
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	const contextLength = Object.values( json['context'] ).length
	const shortCode     = newStreetShortCode( {
		value: json['context'][contextLength - 1]['short_code'] ?? ''
	} )

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		center   : positionResult.unwrap(),
		shortCode: shortCode.unwrap(),
		place    : place.unwrap(),
		name     : name.unwrap()
	} )
}

/**
 * Create a json from street instance
 * @throws {UnknownException} - if unknown error
 */
export const streetToJson = ( street: Street ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			short_code: street.shortCode.value,
			center    : {
				lat: street.center.lat,
				lng: street.center.lng
			},
			place     : street.place.value,
			name      : street.name.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error street to json' )
		return Err( err )
	}
}
