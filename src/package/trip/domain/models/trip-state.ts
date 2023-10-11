import { z } from 'zod'

export enum TripStateEnum {
  Open   = 'Open',
  Progress = 'Progress',
  Completed   = 'Completed'
}

export const TripEnumSchema = z.nativeEnum( TripStateEnum )

type TripStateEnumType = z.infer<typeof TripEnumSchema>

export type TripState = TripStateEnumType

export interface TripStateProps {
  value : string
}

export const newTripState = ( props: TripStateProps ): TripState => {
  return TripEnumSchema.parse( props.value )
}
