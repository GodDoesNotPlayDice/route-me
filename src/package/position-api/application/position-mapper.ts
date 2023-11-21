import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newPosition,
	Position
} from 'src/package/position-api/domain/models/position'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a position instance from json
 * @throws {PositionInvalidException} - if position is invalid
 */
export const positionFromJson = ( json: Record<string, any> ): Result<Position, Error> => {
	return newPosition( {
		lat: Number( json['latitude'] ),
		lng: Number( json['longitude'] )
	} )
}

/**
 * Create a json from position instance
 * @throws {UnknownException} - if unknown error
 */
export const positionToJson = ( position: Position ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			latitude : position.lat,
			longitude: position.lng
		}

		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error position to json' )
		return Err( err )
	}
}
