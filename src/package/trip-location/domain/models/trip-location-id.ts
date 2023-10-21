import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripLocationIdInvalidException } from 'src/package/trip-location/domain/exception/trip-location-id-invalid-exception'
import { z } from 'zod'

export const TripLocationIDSchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type TripLocationIDType = z.infer<typeof TripLocationIDSchema>

export interface TripLocationID extends TripLocationIDType {}

export interface TripLocationIDProps {
  value: string
}

/**
 * Create location id instance
 * @throws {TripLocationIdInvalidException} - if id is invalid
 */
export const newTripLocationID = ( props: TripLocationIDProps ): Result<TripLocationID, Error> => {
  const result = TripLocationIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new TripLocationIdInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
