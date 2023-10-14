import { Money } from 'src/package/shared/domain/models/money'
import { PricingStrategy } from 'src/package/trip/shared/pricing/pricing-strategy'

export class KilometerPricing implements PricingStrategy{
	constructor(readonly base: Money, readonly km: number) {}

	public calculate(): number {
		return this.km * this.base.value
	}

}
// 100km * 300 = 40.000 / 4 = 10.000
