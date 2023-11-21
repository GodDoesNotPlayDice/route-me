import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripHistoryIdInvalidException } from 'src/package/trip-history/domain/exceptions/trip-history-id-invalid-exception'
import { z } from 'zod'

export const TripHistoryIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type TripHistoryIDType = z.infer<typeof TripHistoryIDSchema>

export interface TripHistoryID extends TripHistoryIDType {}

interface TripHistoryIDProps {
	value: string
}

/**
 * Create a trip history id instance
 * @throws {TripHistoryIdInvalidException} - if id is invalid
 */
export const newTripHistoryID = ( props: TripHistoryIDProps ): Result<TripHistoryID, Error> => {
	const result = TripHistoryIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new TripHistoryIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
