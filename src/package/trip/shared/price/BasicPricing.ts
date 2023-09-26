import { Money } from 'src/package/shared'
import { TripSeat } from 'src/package/trip/domain'
import { PricingStrategy } from 'src/package/trip/shared/price/PricingStrategy'

export class BasicPricing implements PricingStrategy{
	constructor(readonly base: Money, readonly perSeat: Money, readonly seat: TripSeat ) {}

	public calculate(): number {
		const seatPrice = this.perSeat.value * this.seat.value
		return this.base.value + seatPrice
	}

}
