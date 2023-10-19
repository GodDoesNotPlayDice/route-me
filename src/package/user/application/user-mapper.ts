import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  ratingFromJson,
  ratingToJson
} from 'src/package/rating/application/rating-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'
import { User } from 'src/package/user/domain/models/user'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Create a json from user instance
 * @throws {UnknownException} - if unknown error
 */
export const userToJson = ( user: User ): Result<Record<string, any>, Error[]> => {
  try {
    const err: Error[] = []

    const json: Record<string, any> = {
      id   : user.id.value,
      email: user.email.value
    }

    const rating = ratingToJson( user.rating )

    if ( rating.isErr() ) {
      err.push( rating.unwrapErr() )
    }
    else {
      json['rating'] = rating.unwrap()
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error user to json' )
    return Err( [ err ] )
  }
}

/**
 * Create a user instance from json
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 * @throws {RatingIdInvalidException} - if rating id is invalid
 * @throws {RatingValueInvalidException} - if value rating is invalid
 */
export const userFromJson = ( json: Record<string, any> ): Result<User, Error[]> => {

  const err: Error[] = []

  const id = newUserID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const email = newEmail( {
    value: json['email'] ?? ''
  } )

  if ( email.isErr() ) {
    err.push( email.unwrapErr() )
  }

  //TODO: verificar como se comporta null
  const rating = ratingFromJson( json['rating'] )

  if ( rating.isErr() ) {
    err.push( ...rating.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    id    : id.unwrap(),
    email : email.unwrap(),
    rating: rating.unwrap()
  } )
}
