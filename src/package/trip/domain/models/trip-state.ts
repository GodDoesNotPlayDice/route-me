import { z } from 'zod'

type TripStateType = 'open' | 'progress' | 'completed'

export const TripStateEnumSchema = z.enum( [ 'open', 'progress', 'completed' ] )
export type TripStateEnum = z.infer<typeof TripStateEnumSchema>

export const newTripState = ( props: TripStateEnum ): TripStateEnum => {
  return TripStateEnumSchema.parse( props )
}
