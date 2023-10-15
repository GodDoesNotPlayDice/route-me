import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UserEmail } from 'src/package/user/domain/models/user-email'

/**
 * Get user by email
 * @throws {FirebaseOperationException} - if operation failed
 */
export const deleteUser = async (
  repository: AuthUserRepository,
  email : UserEmail
): Promise<Result<boolean, Error>> => {
  // const userIDResult = newUserID({
  //   value: userID
  // })
  //
  // if ( userIDResult.isErr() ){
  //   return Err(userIDResult.unwrapErr())
  // }

  const result = await repository.delete(email)

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
