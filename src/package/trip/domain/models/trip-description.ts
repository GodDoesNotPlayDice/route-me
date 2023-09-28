import { z } from 'zod'

export const TripDescriptionSchema = z.object( {
  value : z.string()
} )

export type TripDescription = z.infer<typeof TripDescriptionSchema>

interface TripDescriptionProps {
  value : string
}

export const newTripDescription = (props : TripDescriptionProps): TripDescription => {
  return TripDescriptionSchema.parse( {
    value : props.value
  } )
}
