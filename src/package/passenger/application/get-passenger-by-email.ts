import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newEmail } from 'src/package/shared/domain/models/email'

/**
 * Get passenger by email
 */
export const getPassengerByEmail = async (
  dao: PassengerDao,
  email: string
): Promise<Result<Passenger, Error[]>> => {
  const emailResult = newEmail( {
    value: email
  } )

  if ( emailResult.isErr() ) {
    return Err( [ emailResult.unwrapErr() ] )
  }

  const result = await dao.getByEmail( emailResult.unwrap() )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
