import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  newUserEmail,
  UserEmail
} from 'src/package/user/domain/models/user-email'
import {
  newUserID,
  UserID
} from 'src/package/user/domain/models/user-id'

export interface User {
  id: UserID
  email: UserEmail
}

export interface UserProps {
  id: string,
  email: string,
}

/**
 * Create a user instance
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 * @throws {UnknowException} - if unknown error
 */
export const newUser = ( props: UserProps ): Result<User, Error[]> => {
  const err: Error[] = []

  const id = newUserID({
    value: props.id
  })

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const email = newUserEmail({
    value: props.email
  })

  if ( email.isErr() ) {
    err.push( email.unwrapErr() )
  }

  if ( err.length > 0 ) return Err( err )

  return Ok({
      id   : id.unwrap(),
      email: email.unwrap(),
    }
  )}
