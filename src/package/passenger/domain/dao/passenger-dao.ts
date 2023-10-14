import { Result } from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class PassengerDao {
  abstract getAll(): Promise<Result<Passenger[], Error[]>>
  abstract getById( id: UserID ): Promise<Result<Passenger, Error[]>>
  abstract create( passenger: Passenger ): Promise<Result<Passenger, Error>>
  abstract delete( id: UserID ): Promise<Result<boolean, Error>>
  abstract update( passenger: Passenger ): Promise<Result<boolean, Error>>
}
