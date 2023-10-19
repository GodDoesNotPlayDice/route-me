import {
  Err,
  None,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { Rating } from 'src/package/rating/domain/models/rating'
import { newRatingID } from 'src/package/rating/domain/models/rating-id'
import { newRatingValue } from 'src/package/rating/domain/models/rating-value'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newGender } from 'src/package/shared/domain/models/gender'
import { newPassword } from 'src/package/shared/domain/models/password'
import { newPhone } from 'src/package/shared/domain/models/phone'
import { newUserBirthDay } from 'src/package/user/domain/models/user-birth-day'
import { newUserCountry } from 'src/package/user/domain/models/user-country'
import { newUserDescription } from 'src/package/user/domain/models/user-description'
import { newUserID } from 'src/package/user/domain/models/user-id'
import { newUserLastName } from 'src/package/user/domain/models/user-last-name'
import { newUserName } from 'src/package/user/domain/models/user-name'
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
 * @throws {UserNameInvalidException} - if name is invalid
 * @throws {UserLastNameInvalidException} - if last name is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if length exceeds maximum
 * @throws {UserBirthDayInvalidException} - if birthday is invalid
 * @throws {UserCountryInvalidException} - if country is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 * @throws {RatingIdInvalidException} - if rating id is invalid
 * @throws {RatingValueInvalidException} - if rating value is invalid
 * @throws {UserDescriptionInvalidException} - if description is invalid
 */
export const registerUser = async ( repository: AuthUserRepository,
  props: {
    email: string,
    password: string,
    name: string,
    lastName: string,
    phone: string,
    birthDay: Date,
    country: string,
    gender: string
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
    value: props.password
  } )

  if ( password.isErr() ) {
    error.push( ...password.unwrapErr() )
  }

  const name = newUserName( {
    value: props.name
  } )

  if ( name.isErr() ) {
    error.push( name.unwrapErr() )
  }

  const lastName = newUserLastName( {
    value: props.lastName
  } )

  if ( lastName.isErr() ) {
    error.push( lastName.unwrapErr() )
  }

  const phone = newPhone( {
    value: props.phone
  } )

  if ( phone.isErr() ) {
    error.push( ...phone.unwrapErr() )
  }

  const birthDay = newUserBirthDay( {
    value: props.birthDay
  } )

  if ( birthDay.isErr() ) {
    error.push( birthDay.unwrapErr() )
  }

  const country = newUserCountry( {
    value: props.country
  } )

  if ( country.isErr() ) {
    error.push( country.unwrapErr() )
  }

  const gender = newGender( {
    value: props.gender
  } )

  if ( gender.isErr() ) {
    error.push( gender.unwrapErr() )
  }

  const description = newUserDescription( {
    value: ''
  } )

  if ( description.isErr() ) {
    error.push( description.unwrapErr() )
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

  const rating: Rating = {
    id   : ratingID.unwrap(),
    value: ratingValue.unwrap()
  }

  if ( error.length > 0 ) {
    return Err( error )
  }

  const result = await repository.register(
    {
      id         : id.unwrap(),
      email      : email.unwrap(),
      lastName   : lastName.unwrap(),
      name       : name.unwrap(),
      phone      : phone.unwrap(),
      gender     : gender.unwrap(),
      birthDay   : birthDay.unwrap(),
      country    : country.unwrap(),
      preferences: [],
      rating     : rating,
      description: description.unwrap(),
      driver     : None
    },
    password.unwrap()
  )

  if ( result.isErr() ) {
    error.push( result.unwrapErr() )
    return Err( error )
  }

  return Ok( result.unwrap() )
}
