import { z } from 'zod'

export const TripHistoryIDSchema = z.object( {
  value : z.string()
} )

type TripHistoryIDType = z.infer<typeof TripHistoryIDSchema>
export interface TripHistoryID extends TripHistoryIDType{}

interface TripHistoryIDProps {
  value : string
}

export const newTripHistoryID = (props : TripHistoryIDProps): TripHistoryID => {
  return TripHistoryIDSchema.parse( {
    value : props.value
  } )
}
