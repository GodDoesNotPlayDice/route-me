import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/passenger/domain/auth-passenger-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export const loginPassenger = async ( repository: AuthPassengerRepository, userID : UserID ): Promise<Result<Passenger, string>> => {
  try {
    const result   = await repository.login(userID)
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
