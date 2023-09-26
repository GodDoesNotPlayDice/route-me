import { Money } from 'src/package/shared'
import { TripSeat } from 'src/package/trip/domain'

export interface PricingStrategy {
	readonly base: Money
	readonly seat: TripSeat
	calculate(): number;
}
