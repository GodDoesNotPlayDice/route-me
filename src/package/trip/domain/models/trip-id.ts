import { z } from 'zod'

export const TripIDSchema = z.object( {
  value : z.string()
} )

export type TripID = z.infer<typeof TripIDSchema>

interface TripIDProps {
  value : string
}

export const newTripID = (props : TripIDProps): TripID => {
  return TripIDSchema.parse( {
    value : props.value
  } )
}
