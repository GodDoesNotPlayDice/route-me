import {
  CurrencySchema,
  MoneySchema,
  newMoney
} from 'src/package/shared'
import { PricingStrategy } from 'src/package/trip/shared'
import { z } from 'zod'

export const TripPriceSchema = z.object( {
  amount : MoneySchema,
  currency : CurrencySchema,
  pricing: z.instanceof(PricingStrategy)
} ).transform( ( val, ctx ) => {
  val.amount = newMoney({
    value : val.pricing.calculate(),
  })
  return val
})

export type TripPrice = z.infer<typeof TripPriceSchema>

interface TripPriceProps {
  amount : string,
  currency : string,
  pricing : PricingStrategy
}

export const newTripPrice = (props : TripPriceProps): TripPrice => {
  return TripPriceSchema.parse( {
    amount: MoneySchema.parse({
      value: props.amount
    }),
    currency: CurrencySchema.parse({
      value: props.currency
    }),
    pricing: props.pricing
  } )
}
