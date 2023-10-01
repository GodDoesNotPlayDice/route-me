import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'

export const registerPassenger = async ( repository: PassengerDao,
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
