import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import {
  newUser,
  User
} from 'src/package/user/domain/models/user'

/**
 * Create a json from user instance
 * @throws {UnknownException} - if unknown error
 */
export const userToJson   = ( user: User ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id   : user.id.value,
      email: user.email.value
    }
    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error ? new UnknownException(e.message) : new UnknownException('error user to json')
    return Err( err )
  }
}

/**
 * Create a user instance from json
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 */
export const userFromJson = ( json: Record<string, any> ): Result<User, Error[]> => {
  const result = newUser( {
    id   : json['id'],
    email: json['email']
  } )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok(result.unwrap())
}
