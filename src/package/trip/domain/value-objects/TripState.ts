import { z } from 'zod'

type TripStateType = 'open' | 'progress' | 'completed'

export const TripStateEnumSchema = z.enum( [ 'open', 'progress', 'completed' ] )
export type TripStateEnum = z.infer<typeof TripStateEnumSchema>

export class TripState {
  constructor( readonly value: TripStateType ) {
    TripStateEnumSchema.parse( value )
  }
}
