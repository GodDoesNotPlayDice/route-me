import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newPosition,
	Position,
	PositionProps
} from 'src/package/position-api/domain/models/position'
import {
	newStreetName,
	StreetName
} from 'src/package/street-api/domain/models/street-name'
import {
	newStreetPlace,
	StreetPlace
} from 'src/package/street-api/domain/models/street-place'
import { newStreetMapBox } from 'src/package/street-api/infrastructure/map-box/models/street-map-box'

export interface Street {
	name: StreetName
	place: StreetPlace
	center: Position
}

export interface StreetProps {
	center: PositionProps
	place: string
	name: string
}

/**
 * Create a street instance
 * @throws {StreetNameInvalidException} - if name is invalid
 * @throws {StreetPlaceInvalidException} - if place is invalid
 * @throws {PositionInvalidException} - if position is invalid
 */
export const newStreet = ( props: StreetProps ): Result<Street, Error[]> => {
	const err: Error[]   = []
	const positionResult = newPosition( {
		lat: props.center.lat,
		lng: props.center.lng
	} )

	if ( positionResult.isErr() ) {
		err.push( positionResult.unwrapErr() )
	}

	const place = newStreetPlace( {
		value: props.place
	} )

	if ( place.isErr() ) {
		err.push( place.unwrapErr() )
	}

	const name = newStreetName( {
		value: props.name
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		center: positionResult.unwrap(),
		place : place.unwrap(),
		name  : name.unwrap()
	} )
}

export const newStreetFromJson = ( json: Record<string, any> ): Result<Street, Error[]> => {
	return newStreetMapBox( json )
}
