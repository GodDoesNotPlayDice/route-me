import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { RatingIdInvalidException } from 'src/package/rating/domain/exceptions/rating-id-invalid-exception'
import { z } from 'zod'

export const RatingIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type RatingIDType = z.infer<typeof RatingIDSchema>

export interface RatingID extends RatingIDType {}

export interface RatingIDProps {
	value: string
}

/**
 * Create a rating id instance
 * @throws {RatingIdInvalidException} - if id is invalid
 */
export const newRatingID = ( props: RatingIDProps ): Result<RatingID, Error> => {
	const result = RatingIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new RatingIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
