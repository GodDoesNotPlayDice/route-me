import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Email } from 'src/package/shared/domain/models/email'

/**
 * Delete a passenger by email
 * @throws {FirebaseOperationException} - if operation failed
 */
export const deletePassenger = async (
  dao: PassengerDao,
  email: Email
): Promise<Result<boolean, Error>> => {
  const result = await dao.delete( email )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
