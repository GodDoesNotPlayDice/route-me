import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newStreet,
	Street,
	StreetProps
} from 'src/package/street-api/domain/models/street'
import { newStreetsDataMapBox } from 'src/package/street-api/infrastructure/map-box/models/street-map-box'

export interface StreetsData {
	streets: Street[]
}

export interface StreetsDataProps {
	streets: StreetProps[]
}

/**
 * Create a streets data instance
 * @throws {StreetNameInvalidException} - if some name is invalid
 * @throws {StreetPlaceInvalidException} - if some place is invalid
 * @throws {PositionInvalidException} - if some position is invalid
 */
export const newStreetsData = ( props: StreetsDataProps ): Result<StreetsData, Error[]> => {
	const err: Error[] = []

	const streetsList: Street[] = []

	for ( const street of props.streets ) {
		const streetResult = newStreet( {
			center: street.center,
			place : street.place,
			name  : street.name
		} )

		if ( streetResult.isErr() ) {
			err.push( ...streetResult.unwrapErr() )
			break
		}
		else {
			streetsList.push( streetResult.unwrap() )
		}
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		streets: streetsList
	} )
}

export const newStreetsDataFromJson = ( json: Record<string, any> ): Result<StreetsData, Error[]> => {
	return newStreetsDataMapBox( json )
}
