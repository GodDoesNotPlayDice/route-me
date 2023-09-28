import { Money } from "src/package/shared/domain/models"
import { TripSeat } from 'src/package/trip/domain'

export abstract class PricingStrategy {
	readonly base: Money
	readonly seat: TripSeat
	abstract calculate(): number;
}
