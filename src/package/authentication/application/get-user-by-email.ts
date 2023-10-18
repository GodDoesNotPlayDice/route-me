import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { newUserEmail } from 'src/package/shared/domain/models/email'

/**
 * Get user by email
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {UserEmailNotFoundException} - if user email not found
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 */
export const getUserByEmail = async (
  repository: AuthUserRepository,
  email : string
): Promise<Result<boolean, Error[]>> => {
  const emailResult = newUserEmail({
    value: email
  })

  if ( emailResult.isErr() ){
    return Err([emailResult.unwrapErr()])
  }

  const result = await repository.getByEmail(emailResult.unwrap())

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
