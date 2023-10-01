import { z } from 'zod'

export enum TripPaymentMethodEnum {
  Basic   = 'Basic',
  Other = 'Other',
}

export const TripPaymentMethodSchema = z.nativeEnum( TripPaymentMethodEnum )

export type TripPaymentMethod = z.infer<typeof TripPaymentMethodSchema>

export interface TripPaymentMethodProps {
  value : string
}

export const newTripPaymentMethod = (props : TripPaymentMethodProps): TripPaymentMethod => {
  return TripPaymentMethodSchema.parse( props.value)
}
