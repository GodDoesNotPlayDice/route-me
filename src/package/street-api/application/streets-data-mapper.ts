import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import {
	streetFromJson,
	streetToJson
} from 'src/package/street-api/application/street-mapper'
import { Street } from 'src/package/street-api/domain/models/street'
import { StreetsData } from 'src/package/street-api/domain/models/streets-data'

/**
 * Create a street instance from json
 * @throws {StreetNameInvalidException} - if some name is invalid
 * @throws {StreetPlaceInvalidException} - if some place is invalid
 * @throws {PositionInvalidException} - if some position is invalid
 */
export const streetsDataFromJson = ( json: Record<string, any> ): Result<StreetsData, Error[]> => {
	const err: Error[] = []

	const streets: Street[] = []
	for ( const value of Object.values( json['features'] ) ) {
		const streetResult = streetFromJson( value as Record<string, any> )

		if ( streetResult.isErr() ) {
			err.push( ...streetResult.unwrapErr() )
			break
		}
		const result = streetResult.unwrap()
		streets.push( {
			center   : result.center,
			shortCode: result.shortCode,
			place    : result.place,
			name     : result.name
		} )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		streets: streets
	} )
}

/**
 * Create a json from street instance
 * @throws {UnknownException} - if unknown error
 */
export const streetsDataToJson = ( streetsData: StreetsData ): Result<Record<string, any>, Error[]> => {
	try {
		const err: Error[] = []

		const streets: Record<string, any>[] = []

		for ( const street of streetsData.streets ) {
			const streetResult = streetToJson( street )
			if ( streetResult.isErr() ) {
				err.push( streetResult.unwrapErr() )
			}
			else {
				streets.push( streetResult.unwrap() )
			}
		}

		if ( err.length > 0 ) {
			return Err( err )
		}
		return Ok( {
			streets: streets
		} )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error street to json' )
		return Err( [ err ] )
	}
}
