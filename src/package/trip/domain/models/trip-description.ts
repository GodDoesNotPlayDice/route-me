import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripDescriptionInvalidException } from 'src/package/trip/domain/exceptions/trip-description-invalid-exception'
import { z } from 'zod'

export const TripDescriptionSchema = z.object( {
  value: z.string()
} )

type TripDescriptionType = z.infer<typeof TripDescriptionSchema>

export interface TripDescription extends TripDescriptionType {

}

export interface TripDescriptionProps {
  value: string
}

/**
 * Create trip description instance
 * @throws {TripDescriptionInvalidException} - if description is invalid
 */
export const newTripDescription = ( props: TripDescriptionProps ): Result<TripDescription, Error> => {
  const result = TripDescriptionSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new TripDescriptionInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
