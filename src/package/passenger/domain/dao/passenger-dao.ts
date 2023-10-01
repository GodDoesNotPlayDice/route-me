import { Result } from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'

export abstract class PassengerDao {
  abstract getAll(): Promise<Result<Passenger[], string>>
  abstract getById( id: PassengerID ): Promise<Result<Passenger, string>>
}
