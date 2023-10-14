import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { RatingValueInvalidException } from 'src/package/rating/domain/exceptions/rating-value-invalid-exception'
import { z } from 'zod'

export const RatingValueSchema = z.object( {
  value: z.string()
} )

type RatingValueType = z.infer<typeof RatingValueSchema>

export interface RatingValue extends RatingValueType {}

export interface RatingValueProps {
  value: string
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
    return Err( new RatingValueInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
