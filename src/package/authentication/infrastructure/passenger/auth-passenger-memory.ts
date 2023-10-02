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

  public delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  public login( userID: UserID ): Promise<Result<Passenger, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  public register( passenger: Omit<Passenger, "id" | "preferences" | "description"> ): Promise<Result<string, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  public update( passenger: Passenger ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( 'error' ) )
  }
}