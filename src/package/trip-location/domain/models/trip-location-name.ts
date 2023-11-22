import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripLocationNameInvalidException } from 'src/package/trip-location/domain/exception/trip-location-name-invalid-exception'
import { z } from 'zod'

export const TripLocationNameSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type TripLocationNameType = z.infer<typeof TripLocationNameSchema>

export interface TripLocationName extends TripLocationNameType {}

export interface TripLocationNameProps {
	value: string
}

/**
 * Create location name instance
 * @throws {TripLocationNameInvalidException} - if name is invalid
 */
export const newTripLocationName = ( props: TripLocationNameProps ): Result<TripLocationName, Error> => {
	const result = TripLocationNameSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new TripLocationNameInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
