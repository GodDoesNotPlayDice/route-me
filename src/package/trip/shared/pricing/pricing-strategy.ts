import { Money } from 'src/package/shared'
import { TripSeat } from 'src/package/trip/domain'

export interface TripPricingProps {
  base: Money
  seat: TripSeat
}

export type PricingStrategy = ( base: Money, seat: TripSeat ) => number

export const calculateTripPrice = ( props: TripPricingProps,
  pricingStrategy: PricingStrategy ): number => {
  return pricingStrategy( props.base, props.seat )
}
