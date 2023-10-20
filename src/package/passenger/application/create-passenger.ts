import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newPassengerBirthDay } from 'src/package/passenger/domain/models/passenger-birth-day'
import { newPassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { newPassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { newpassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Rating } from 'src/package/rating/domain/models/rating'
import { newRatingID } from 'src/package/rating/domain/models/rating-id'
import { newRatingValue } from 'src/package/rating/domain/models/rating-value'
import { Email } from 'src/package/shared/domain/models/email'
import { newGender } from 'src/package/shared/domain/models/gender'
import { newImageUrl } from 'src/package/shared/domain/models/image-url'
import { newPhone } from 'src/package/shared/domain/models/phone'
import { ulid } from 'ulidx'

/**
 * Register user
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if length exceeds maximum
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {ImageUrlInvalidException} - if image is invalid
 */
export const createPassenger = async ( dao: PassengerDao,
  props: {
    email: Email,
    name: string,
    lastName: string,
    phone: string,
    birthDay: Date,
    country: string,
    gender: string
  }
): Promise<Result<Passenger, Error[]>> => {
  const error: Error[] = []

  const id = newPassengerID( {
    value: ulid()
  } )

  if ( id.isErr() ) {
    error.push( id.unwrapErr() )
  }

  const name = newPassengerName( {
    value: props.name
  } )

  if ( name.isErr() ) {
    error.push( name.unwrapErr() )
  }

  const lastName = newpassengerLastName( {
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

  const birthDay = newPassengerBirthDay( {
    value: props.birthDay
  } )

  if ( birthDay.isErr() ) {
    error.push( birthDay.unwrapErr() )
  }

  const country = newPassengerCountry( {
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

  const description = newPassengerDescription( {
    value: ''
  } )

  if ( description.isErr() ) {
    error.push( description.unwrapErr() )
  }

  const image = newImageUrl( {
    value: 'https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png'
  } )

  if ( image.isErr() ) {
    error.push( image.unwrapErr() )
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

  const passenger: Passenger = {
    id         : id.unwrap(),
    image      : image.unwrap(),
    email      : props.email,
    lastName   : lastName.unwrap(),
    name       : name.unwrap(),
    phone      : phone.unwrap(),
    gender     : gender.unwrap(),
    birthDay   : birthDay.unwrap(),
    country    : country.unwrap(),
    rating     : rating,
    preferences: [],
    description: description.unwrap()
  }

  const result = await dao.create( passenger )

  if ( result.isErr() ) {
    error.push( ...result.unwrapErr() )
    return Err( error )
  }

  return Ok( passenger )
}
