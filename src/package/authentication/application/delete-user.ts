import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { Email } from 'src/package/shared/domain/models/email'

/**
 * Get user by email
 * @throws {FirebaseOperationException} - if operation failed
 */
export const deleteUser = async (
  repository: AuthUserRepository,
  email: Email
): Promise<Result<boolean, Error>> => {
  const result = await repository.delete( email )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
