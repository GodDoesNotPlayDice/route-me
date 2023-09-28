import { z } from 'zod'

export const TripSeatSchema = z.object( {
  value : z.number().nonnegative()
} )

export type TripSeat = z.infer<typeof TripSeatSchema>

interface TripSeatProps {
  value : string
}

export const newTripSeat = (props : TripSeatProps): TripSeat => {
  return TripSeatSchema.parse( {
    value : props.value
  } )
}
