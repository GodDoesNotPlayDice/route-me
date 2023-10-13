import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Direction,
	newDirectionFromJson
} from 'src/package/direction-api/domain/models/direction'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a direction instance from json
 * @throws {GeometryInvalidException} - if geometry is invalid
 */
export const directionFromJson = ( json: Record<string, any> ): Result<Direction, Error> => {
	return newDirectionFromJson( json )
}

/**
 * Create a json from direction instance
 * @throws {UnknowException} - if unknown error
 */
export const directionToJson = ( direction: Direction ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			coordinates: direction.coordinates.values
		}

		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error direction to json' )
		return Err( err )
	}
}
