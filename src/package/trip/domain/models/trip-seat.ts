import { z } from 'zod'

export const TripSeatSchema = z.object( {
  value : z.number().nonnegative()
} )

type TripSeatType = z.infer<typeof TripSeatSchema>
export interface TripSeat extends TripSeatType{}

export interface TripSeatProps {
  value : number
}

export const newTripSeat = (props : TripSeatProps): TripSeat => {
  return TripSeatSchema.parse( {
    value : props.value
  } )
}