import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newPassword } from 'src/package/shared/domain/models/password'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { newUserID } from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'

/**
 * Register user
 * @throws {UserIdInvalidException} - if id is invalid
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PasswordInsufficientLengthException} - if password length is invalid
 * @throws {PasswordInsufficientUppercaseException} - if password uppercase is invalid
 * @throws {PasswordInsufficientLowercaseException} - if password lowercase is invalid
 * @throws {PasswordInsufficientNumberException} - if password number is invalid
 * @throws {PasswordInsufficientCharacterException} - if password character is invalid
 * @throws {InfrastructureOperationException} - if operation failed
 */
export const createUser = async ( dao: UserDao,
  props: {
    email: string,
    password: string,
  }
): Promise<Result<string, Error[]>> => {
  const error: Error[] = []

  const id = newUserID( {
    value: ulid()
  } )

  if ( id.isErr() ) {
    error.push( id.unwrapErr() )
  }

  const email = newEmail( {
    value: props.email ?? ''
  } )

  if ( email.isErr() ) {
    error.push( email.unwrapErr() )
  }

  const password = newPassword( {
    value: props.password ?? ''
  } )

  if ( password.isErr() ) {
    error.push( ...password.unwrapErr() )
  }

  if ( error.length > 0 ) {
    return Err( error )
  }

  const result = await dao.create(
    {
      id    : id.unwrap(),
      email : email.unwrap(),
    },
    password.unwrap()
  )

  if ( result.isErr() ) {
    error.push( ...result.unwrapErr() )
    return Err( error )
  }

  return Ok( result.unwrap() )
}
