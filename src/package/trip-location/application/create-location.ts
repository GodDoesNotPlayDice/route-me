import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { LocationDao } from 'src/package/trip-location/domain/dao/location-dao'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { newTripLocationCountryCode } from 'src/package/trip-location/domain/models/trip-location-country-code'
import { newTripLocationID } from 'src/package/trip-location/domain/models/trip-location-id'
import { newTripLocationName } from 'src/package/trip-location/domain/models/trip-location-name'
import { ulid } from 'ulidx'

export const createLocation = async ( repository: LocationDao, props: {
	name: string,
	countryCode: string,
	position: Position
} ): Promise<Result<TripLocation, Error[]>> => {
	const err: Error[] = []

	const id = newTripLocationID( {
		value: ulid()
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

	const code = newTripLocationCountryCode( {
		value: props.countryCode
	} )

	if ( code.isErr() ) {
		err.push( code.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const location: TripLocation = {
		id         : id.unwrap(),
		name       : name.unwrap(),
		countryCode: code.unwrap(),
		position   : props.position
	}

	const result = await repository.create( location )

	if ( result.isErr() ) {
		err.push( result.unwrapErr() )
		return Err( err )
	}

	return Ok( location )
}
