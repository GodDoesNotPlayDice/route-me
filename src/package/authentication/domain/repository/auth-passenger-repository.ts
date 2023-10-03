import { Result } from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class AuthPassengerRepository {
  abstract login( userID: UserID ): Promise<Result<Passenger, string>>

  abstract register( passenger: Omit<Passenger, 'description'> ): Promise<Result<string, string>>

  abstract delete( id: UserID ): Promise<Result<boolean, string>>

  abstract update( passenger: Passenger ): Promise<Result<boolean, string>>
}
