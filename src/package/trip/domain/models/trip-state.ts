import { z } from 'zod'

export const TripStateSchema = z.enum( [ 'open', 'progress', 'completed' ] )

type TripStateType = z.infer<typeof TripStateSchema>

export type TripState = TripStateType

export type TripStateProps = 'open' | 'progress' | 'completed'

export const newTripState = ( props: TripStateProps ): TripState => {
  return TripStateSchema.parse( props )
}
