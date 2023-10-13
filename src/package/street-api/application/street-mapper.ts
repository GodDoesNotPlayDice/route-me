import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Street } from 'src/package/street-api/domain/models/street'
import {
	newStreetsDataFromJson,
	StreetsData
} from 'src/package/street-api/domain/models/streets-data'

/**
 * Create a street instance from json
 * @throws {StreetNameInvalidException} - if some name is invalid
 * @throws {StreetPlaceInvalidException} - if some place is invalid
 * @throws {PositionInvalidException} - if some position is invalid
 */
export const streetsDataFromJson = ( json: Record<string, any> ): Result<StreetsData, Error[]> => {
	return newStreetsDataFromJson( json )
}

/**
 * Create a json from street instance
 * @throws {UnknownException} - if unknown error
 */
export const streetToJson = ( street: Street ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			center: {
				lat: street.center.lat,
				lng: street.center.lng
			},
			place : street.place.value,
			name  : street.name.value
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
