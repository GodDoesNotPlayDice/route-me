import { z } from 'zod'

export const TripHistoryIDSchema = z.object( {
  value : z.string()
} )

export type TripHistoryID = z.infer<typeof TripHistoryIDSchema>

interface TripHistoryIDProps {
  value : string
}

export const newTripHistoryID = (props : TripHistoryIDProps): TripHistoryID => {
  return TripHistoryIDSchema.parse( {
    value : props.value
  } )
}
