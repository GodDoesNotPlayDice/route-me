import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Rating } from 'src/package/rating/domain/models/rating'
import { newRatingID } from 'src/package/rating/domain/models/rating-id'
import { newRatingValue } from 'src/package/rating/domain/models/rating-value'
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
 * @throws {RatingIdInvalidException} - if id is invalid
 * @throws {RatingValueInvalidException} - if value is invalid
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

  const ratingID = newRatingID( {
    value: ulid()
  } )

  if ( ratingID.isErr() ) {
    error.push( ratingID.unwrapErr() )
  }

  const ratingValue = newRatingValue( {
    value: 0
  } )

  if ( ratingValue.isErr() ) {
    error.push( ratingValue.unwrapErr() )
  }

  if ( error.length > 0 ) {
    return Err( error )
  }

  const rating: Rating = {
    id   : ratingID.unwrap(),
    value: ratingValue.unwrap()
  }

  const result = await dao.create(
    {
      id    : id.unwrap(),
      email : email.unwrap(),
      rating: rating
    },
    password.unwrap()
  )

  if ( result.isErr() ) {
    error.push( result.unwrapErr() )
    return Err( error )
  }

  return Ok( result.unwrap() )
}
