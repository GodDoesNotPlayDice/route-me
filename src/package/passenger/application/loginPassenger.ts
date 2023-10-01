import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export const loginPassenger = async ( repository: PassengerDao, userID : UserID ): Promise<Result<Passenger, string>> => {
  try {
    const result   = await repository.loginPassenger(userID)
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
