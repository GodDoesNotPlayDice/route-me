import {
  Currency,
  Money
} from 'src/package/shared'
import { PricingStrategy } from 'src/package/trip/shared/price/PricingStrategy'

export class TripPrice {
  constructor( private pricing : PricingStrategy, readonly currency: Currency) {
    this.amount = new Money(this.pricing.calculate())
  }
  readonly amount : Money
}
