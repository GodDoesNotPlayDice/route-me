import { Result } from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class PassengerDao {
  abstract getAll(): Promise<Result<Passenger[], Error[]>>

  abstract create(
    passenger: Passenger
  ): Promise<Result<string, Error>>

  abstract update( user: Passenger ): Promise<Result<boolean, Error>>

  abstract getByEmail( email: Email ): Promise<Result<Passenger, Error[]>>

  abstract delete( email: Email ): Promise<Result<boolean, Error>>
}
