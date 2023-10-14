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
import { newPassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { newPassengerPhone } from 'src/package/passenger/domain/models/passenger-phone'
import {
  newPreferenceID,
  PreferenceID
} from 'src/package/preference/domain/models/preference-id'
import { newGender } from 'src/package/shared/domain/models/gender'

/**
 * Update passenger
 * @throws {GenderInvalidException} - if gender is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 */
export const updatePassenger = async ( repository: PassengerDao,
  passenger: Passenger, partialProps: {
    name?: string,
    lastName?: string,
    description?: string,
    preferences?: string[],
    phone?: string,
    birthDay?: Date,
    country?: string,
    gender?: string
  } ): Promise<Result<Passenger, Error[]>> => {
  const err: Error[] = []

  let preferences: PreferenceID[] = []
  if ( partialProps.preferences !== undefined ) {
    for ( const preference of Object.values( partialProps.preferences ) ) {
      const result = newPreferenceID( {
        value: preference ?? ''
      } )
      if ( result.isErr() ) {
        err.push( result.unwrapErr() )
      }
      else {
        preferences.push( result.unwrap() )
      }
    }
  }
  else {
    preferences = passenger.preferences
  }

  const gender = newGender( {
    value: partialProps.gender === undefined
      ? passenger.gender
      : partialProps.gender
  } )

  if ( gender.isErr() ) {
    err.push( gender.unwrapErr() )
  }

  const name = newPassengerName( {
    value: partialProps.name === undefined
      ? passenger.name.value
      : partialProps.name
  } )

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const lastName = newPassengerLastName( {
    value: partialProps.lastName === undefined
      ? passenger.lastName.value
      : partialProps.lastName
  } )

  if ( lastName.isErr() ) {
    err.push( lastName.unwrapErr() )
  }

  const description = newPassengerDescription( {
    value: partialProps.description === undefined
      ? passenger.description.value
      : partialProps.description
  } )

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const phone = newPassengerPhone( {
    value: partialProps.phone === undefined
      ? passenger.phone.value
      : partialProps.phone
  } )

  if ( phone.isErr() ) {
    err.push( ...phone.unwrapErr() )
  }

  const birthDay = newPassengerBirthDay( {
    value: partialProps.birthDay === undefined
      ? passenger.birthDay.value
      : partialProps.birthDay
  } )

  if ( birthDay.isErr() ) {
    err.push( birthDay.unwrapErr() )
  }

  const country = newPassengerCountry( {
    value: partialProps.country === undefined
      ? passenger.country.value
      : partialProps.country
  } )

  if ( country.isErr() ) {
    err.push( country.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  const passengerUpdated: Passenger = {
    id         : passenger.id,
    userID     : passenger.userID,
    name       : name.unwrap(),
    phone      : phone.unwrap(),
    country    : country.unwrap(),
    birthDay   : birthDay.unwrap(),
    description: description.unwrap(),
    lastName   : lastName.unwrap(),
    preferences: preferences,
    gender     : gender.unwrap()
  }

  const result = await repository.update( passengerUpdated )

  if ( result.isErr() ) {
    err.push( result.unwrapErr() )
    return Err( err )
  }

  return Ok( passengerUpdated )
}
