import {
  Err,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'

export class PassengerDaoMemory implements PassengerDao {
  constructor( private context: Passenger[] ) {}

  public getAll(): Promise<Result<Passenger[], string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  public getById( id: PassengerID ): Promise<Result<Passenger, string>> {
    return Promise.resolve( Err( 'error' ) )
  }
}
