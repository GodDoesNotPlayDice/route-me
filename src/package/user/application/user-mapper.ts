import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { User } from 'src/package/user/domain/models/user'
import { newUserEmail } from 'src/package/user/domain/models/user-email'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Create a json from user instance
 * @throws {UnknownException} - if unknown error
 */
export const userToJson = ( user: User ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id   : user.id.value,
      email: user.email.value
    }
    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error user to json' )
    return Err( err )
  }
}

/**
 * Create a user instance from json
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 */
export const userFromJson = ( json: Record<string, any> ): Result<User, Error[]> => {

  const err: Error[] = []

  const id = newUserID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const email = newUserEmail( {
    value: json['email'] ?? ''
  } )

  if ( email.isErr() ) {
    err.push( email.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    id   : id.unwrap(),
    email: email.unwrap()
  } )
}
