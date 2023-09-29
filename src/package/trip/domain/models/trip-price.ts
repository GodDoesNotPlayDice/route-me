import {
  Currency,
  Money,
  MoneySchema,
  newMoney
} from 'src/package/shared'
import { TripSeat } from 'src/package/trip/domain/models/trip-seat'
import { PricingStrategy } from 'src/package/trip/shared'
import { z } from 'zod'

export const TripPriceSchema = z.object( {
  amount  : MoneySchema,
} )

type TripPriceType = z.infer<typeof TripPriceSchema>

export interface TripPrice extends TripPriceType {
  currency: Currency,
}

export interface TripPriceProps {
  amount: Money,
  currency: Currency,
  seat: TripSeat,
  pricing: PricingStrategy
}

export const newTripPrice = ( props: TripPriceProps ): TripPrice => {
  const recalculatedPrice = props.pricing(props.amount, props.seat)
  return {
    amount: newMoney({
      value: recalculatedPrice
    }),
    currency: props.currency
  }
}
