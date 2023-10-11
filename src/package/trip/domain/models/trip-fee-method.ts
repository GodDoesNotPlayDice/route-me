import { z } from 'zod'

export enum TripFeeMethodEnum {
  Basic   = 'Basic',
  Other = 'Other',
}

export const TripFeeMethodSchema = z.nativeEnum( TripFeeMethodEnum )

export type TripFeeMethod = z.infer<typeof TripFeeMethodSchema>

export interface TripFeeMethodProps {
  value : string
}

export const newTripFeeMethod = (props : TripFeeMethodProps): TripFeeMethod => {
  return TripFeeMethodSchema.parse( props.value)
}
