import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerRepository } from 'src/package/passenger/domain'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

export const registerPassenger = async ( repository: PassengerRepository,
  props: Omit<Passenger, 'id'> ): Promise<Result<boolean, string>> => {
  try {
    const result   = await repository.registerPassenger( { ...props } )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
