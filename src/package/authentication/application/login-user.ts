import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newPassword } from 'src/package/shared/domain/models/password'
import { User } from 'src/package/user/domain/models/user'

/**
 * Login user
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PasswordInsufficientLengthException} - if password length is invalid
 * @throws {PasswordInsufficientUppercaseException} - if password uppercase is invalid
 * @throws {PasswordInsufficientLowercaseException} - if password lowercase is invalid
 * @throws {PasswordInsufficientNumberException} - if password number is invalid
 * @throws {PasswordInsufficientCharacterException} - if password character is invalid
 * @throws {EmailNotFoundException} - if email not found
 * @throws {PasswordNotMatchException} - if password not match
 * @throws {UnknownException} - if unknown error
 */
export const loginUser = async ( repository: AuthUserRepository,
  email: string,
  password: string ): Promise<Result<User, Error[]>> => {
  const error: Error[] = []

  const emailResult = newEmail( {
    value: email
  } )

  if ( emailResult.isErr() ) {
    error.push( emailResult.unwrapErr() )
  }

  const passwordResult = newPassword( {
    value: password
  } )

  if ( passwordResult.isErr() ) {
    error.push( ...passwordResult.unwrapErr() )
  }

  if ( error.length > 0 ) {
    return Err( error )
  }

  const result = await repository.login(
    emailResult.unwrap(),
    passwordResult.unwrap()
  )

  if ( result.isErr() ) {
    error.push( ...result.unwrapErr() )
    return Err( error )
  }

  return Ok( result.unwrap() )
}
