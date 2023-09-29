import { z } from 'zod'

export const TripDescriptionSchema = z.object( {
  value : z.string()
} )

type TripDescriptionType = z.infer<typeof TripDescriptionSchema>
export interface TripDescription extends TripDescriptionType{

}

interface TripDescriptionProps {
  value : string
}

export const newTripDescription = (props : TripDescriptionProps): TripDescription => {
  return TripDescriptionSchema.parse( {
    value : props.value
  } )
}
