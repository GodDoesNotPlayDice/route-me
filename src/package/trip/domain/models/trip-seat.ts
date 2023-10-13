import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripSeatInvalidException } from 'src/package/trip/domain/exceptions/trip-seat-invalid-exception'
import { z } from 'zod'

export const TripSeatSchema = z.object( {
  value : z.number().nonnegative()
} )

type TripSeatType = z.infer<typeof TripSeatSchema>
export interface TripSeat extends TripSeatType{}

export interface TripSeatProps {
  value : number
}

/**
 * Create a trip seat instance
 * @throws {TripSeatInvalidException} - if seat is invalid
 */
export const newTripSeat = (props : TripSeatProps): Result<TripSeat, Error> => {
  const result = TripSeatSchema.safeParse( {
    value : props.value
  } )

  if ( !result.success ) {
    return Err( new TripSeatInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
