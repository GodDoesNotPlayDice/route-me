import { z } from 'zod'

export const TripIDSchema = z.object( {
  value : z.string()
} )

type TripIDType = z.infer<typeof TripIDSchema>
export interface TripID extends TripIDType{}

export interface TripIDProps {
  value : string
}

export const newTripID = (props : TripIDProps): TripID => {
  return TripIDSchema.parse( {
    value : props.value
  } )
}
