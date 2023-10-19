import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { UserDao } from 'src/package/user/domain/dao/user-dao'

/**
 * Delete a user by email
 * @throws {InfrastructureOperationException} - if operation failed
 */
export const deleteUser = async (
  dao: UserDao,
  email: Email
): Promise<Result<boolean, Error>> => {
  const result = await dao.delete( email )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
