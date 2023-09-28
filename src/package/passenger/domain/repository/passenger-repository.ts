import { Result } from 'oxide.ts'
import { PreferenceID } from 'src/package/preference'

export abstract class PassengerRepository {
	abstract fillPassenger(
		name: string,
		lastName: string,
		description: string,
		phone: string,
		birthDay: Date,
		country: string,
		gender: string,
		preferences: PreferenceID[]
	): Promise<Result<boolean, string>>
}
