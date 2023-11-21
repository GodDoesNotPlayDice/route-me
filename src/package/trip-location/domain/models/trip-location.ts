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
	newTripLocationCountryCode,
	TripLocationCountryCode
} from 'src/package/trip-location/domain/models/trip-location-country-code'
import {
	newTripLocationID,
	TripLocationID
} from 'src/package/trip-location/domain/models/trip-location-id'
import {
	newTripLocationName,
	TripLocationName
} from 'src/package/trip-location/domain/models/trip-location-name'

export interface TripLocation {
	id: TripLocationID
	name: TripLocationName
	countryCode: TripLocationCountryCode
	position: Position
}


export interface TripLocationProps {
	id: string
	name: string
	countryCode: string
	position: PositionProps
}

/**
 * Create location instance
 * @throws {TripLocationIdInvalidException} - if id is invalid
 * @throws {TripLocationNameInvalidException} - if name is invalid
 * @throws {TripLocationCountryCodeInvalidException} - if country code is invalid
 * @throws {PositionInvalidException} - if position is invalid
 */
export const newLocation = ( props: TripLocationProps ): Result<TripLocation, Error[]> => {
	const err: Error[] = []

	const id = newTripLocationID( {
		value: props.id
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const name = newTripLocationName( {
		value: props.name
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	const countryCode = newTripLocationCountryCode( {
		value: props.countryCode
	} )

	if ( countryCode.isErr() ) {
		err.push( countryCode.unwrapErr() )
	}

	const position = newPosition( {
		lat: props.position.lat,
		lng: props.position.lng
	} )

	if ( position.isErr() ) {
		err.push( position.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		id         : id.unwrap(),
		name       : name.unwrap(),
		countryCode: countryCode.unwrap(),
		position   : position.unwrap()
	} )
}
