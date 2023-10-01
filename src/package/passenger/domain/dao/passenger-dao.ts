import { Result } from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class PassengerDao {
	abstract registerPassenger(
		passenger: Omit<Passenger, 'id' | 'preferences' | 'description'>,
	): Promise<Result<boolean, string>>
  abstract loginPassenger(
    userID : UserID
  ): Promise<Result<Passenger, string>>
  abstract updatePassenger(
    props: Partial<Passenger>
  ): Promise<Result<boolean, string>>
}
