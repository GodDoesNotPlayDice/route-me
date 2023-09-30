import { Result } from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

export abstract class PassengerRepository {
	abstract registerPassenger(
		passenger: Omit<Passenger, 'id' | 'preferences' | 'description'>,
	): Promise<Result<boolean, string>>
}
