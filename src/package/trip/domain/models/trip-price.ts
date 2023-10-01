import {
  Currency,
  newCurrency
} from 'src/package/shared/domain/models/currency'
import {
  Money,
  newMoney
} from 'src/package/shared/domain/models/money'


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
