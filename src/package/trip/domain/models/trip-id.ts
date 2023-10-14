import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripIdInvalidException } from 'src/package/trip/domain/exceptions/trip-id-invalid-exception'
import { z } from 'zod'

export const TripIDSchema = z.object( {
  value: z.string()
          .nonempty()
} )

type TripIDType = z.infer<typeof TripIDSchema>

export interface TripID extends TripIDType {}

export interface TripIDProps {
  value: string
}

/**
 * Create trip id instance
 * @throws {TripIdInvalidException} - if id is invalid
 */
export const newTripID = ( props: TripIDProps ): Result<TripID, Error> => {
  const result = TripIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new TripIdInvalidException() )
  }
  else {
    return Ok( result.data )
  }

}
