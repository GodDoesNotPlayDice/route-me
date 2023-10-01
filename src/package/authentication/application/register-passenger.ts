import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/domain/repository/auth-passenger-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

export const registerPassenger = async ( repository: AuthPassengerRepository,
  props: Omit<Passenger, 'id'> ): Promise<Result<string, string>> => {
  try {
    const result   = await repository.register( { ...props } )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
