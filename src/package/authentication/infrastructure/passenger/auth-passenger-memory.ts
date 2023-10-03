import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/domain/repository/auth-passenger-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export class AuthPassengerMemory implements AuthPassengerRepository {

  constructor(private context: Passenger[]) {}

  async logout(id: UserID): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
    }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async login( userID: UserID ): Promise<Result<Passenger, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  async register( passenger: Passenger ): Promise<Result<string, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  async update( passenger: Passenger ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( 'error' ) )
  }
}
