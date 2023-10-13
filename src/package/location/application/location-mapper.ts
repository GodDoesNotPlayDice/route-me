import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Direction,
} from 'src/package/direction-api/domain/models/direction'
import {
	Location,
	newLocation
} from 'src/package/location/domain/models/location'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a location instance from json
 * @throws {LocationIdInvalidException} - if id is invalid
 * @throws {LocationNameInvalidException} - if name is invalid
 * @throws {LocationCountryCodeInvalidException} - if country code is invalid
 * @throws {PositionInvalidException} - if position is invalid
 */
export const locationFromJson = ( json: Record<string, any> ): Result<Location, Error[]> => {
	const result = newLocation({
		id: json['id'],
		name: json['name'],
		countryCode: json['countryCode'],
		position: json['position']
	})

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok(result.unwrap())
}

/**
 * Create a json from location instance
 * @throws {UnknowException} - if unknown error
 */
export const locationToJson = ( direction: Direction ): Result<Record<string, any>, Error> => {
	try {
		return Ok( {
			coordinates: direction.coordinates.values
		} )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error location to json' )
		return Err( err )
	}
}
