import { z } from 'zod'

export type TripStateType = 'open' | 'progress' | 'completed'

export const TripStateSchema = z.enum( [ 'open', 'progress', 'completed' ] )

type TripStateEnum = z.infer<typeof TripStateSchema>

export type TripState = TripStateEnum

export interface TripStateProps {
  value : string
}

export const newTripState = ( props: TripStateProps ): TripState => {
  return TripStateSchema.parse( props )
}
