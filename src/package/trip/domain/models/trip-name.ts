import { z } from 'zod'

export const TripNameSchema = z.object( {
  value : z.string()
} )

export type TripName = z.infer<typeof TripNameSchema>

interface TripNameProps {
  value : string
}

export const newTripName = (props : TripNameProps): TripName => {
  return TripNameSchema.parse( {
    value : props.value
  } )
}
