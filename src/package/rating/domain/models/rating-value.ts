import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { RatingValueInvalidException } from 'src/package/rating/domain/exceptions/rating-value-invalid-exception'
import { z } from 'zod'

export const RatingValueSchema = z.object( {
	value: z.number()
	        .min( 0 )
	        .max( 5 )
} )

type RatingValueType = z.infer<typeof RatingValueSchema>

export interface RatingValue extends RatingValueType {}

export interface RatingValueProps {
	value: number
}

/**
 * Create a rating value instance
 * @throws {RatingValueInvalidException} - if value is invalid
 */
export const newRatingValue = ( props: RatingValueProps ): Result<RatingValue, Error> => {
	const result = RatingValueSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		console.log( 'result.error' )
		console.log( result.error )
		return Err( new RatingValueInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}

