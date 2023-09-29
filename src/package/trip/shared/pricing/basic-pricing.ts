import { Money } from 'src/package/shared/domain'
import { TripSeat } from 'src/package/trip/domain'
import { PricingStrategy } from 'src/package/trip/shared/pricing/pricing-strategy'

export const basicPricing = ( perSeat: Money ) : PricingStrategy  => ( base: Money,
  seat: TripSeat ): number => {
  return base.value + ( perSeat.value * seat.value )
}
