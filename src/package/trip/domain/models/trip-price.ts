import {
  Currency,
  Money,
  newCurrency,
  newMoney
} from 'src/package/shared'


// type TripPriceType = z.infer<typeof TripPriceSchema>

export interface TripPrice {
  currency: Currency,
  amount: Money,
}

export interface TripPriceProps {
  amount: number,
  currency: string,
//TODO: recordatorio para backend
  // seat: TripSeat,
  // pricing: PricingStrategy
}

export const newTripPrice = ( props: TripPriceProps ): TripPrice => {
  return {
    amount  : newMoney( {
      value: props.amount
    } ),
    currency: newCurrency( {
      value: props.currency
    } )
  }
}
