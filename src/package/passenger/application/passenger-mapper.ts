import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  Passenger
} from 'src/package/passenger/domain/models/passenger'
import { newPassengerBirthDay } from 'src/package/passenger/domain/models/passenger-birth-day'
import { newPassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { newPassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { newPassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { newPassengerPhone } from 'src/package/passenger/domain/models/passenger-phone'
import {
  newPreferenceID,
  PreferenceID
} from 'src/package/preference/domain/models/preference-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newGender } from 'src/package/shared/domain/models/gender'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Create a json from passenger instance
 * @throws {UnknownException} - if unknown error
 */
export const passengerToJson = ( passenger: Passenger ): Result<Record<string, any>, Error> => {
  try {
    const preferences = passenger.preferences.map(
      ( preference: PreferenceID ) => {
        return preference.value
      } )

    return Ok( {
        id         : passenger.id.value,
        userID     : passenger.userID.value,
        name       : passenger.name.value,
        lastName   : passenger.lastName.value,
        description: passenger.description.value,
        phone      : passenger.phone.value,
        birthDay   : passenger.birthDay.value.toJSON(),
        country    : passenger.country.value,
        gender     : passenger.gender,
        preferences
      }
    )
  }
  catch ( e ) {
    return Err( new UnknownException( 'error passenger to json' ) )
  }
}

/**
 * Create a passenger instance from json
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 * @throws {PreferenceIdInvalidException} - if preference id is invalid
 * @throws {UserIdInvalidException} - if id user is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 */
export const passengerFromJson = ( json: Record<string, any> ): Result<Passenger, Error[]> => {
  const err: Error[] = []

  const preferences: PreferenceID[] = []

  for ( const preference of Object.values( json['preferences'] ) ) {
    const value  = preference as Record<string, any>
    const result = newPreferenceID( {
      value: value['id'] ?? ''
    } )
    if ( result.isErr() ) {
      err.push( result.unwrapErr() )
    }
    else {
      preferences.push( result.unwrap() )
    }
  }

  const userID = newUserID( {
    value: json['userID']
  } )

  if ( userID.isErr() ) {
    err.push( userID.unwrapErr() )
  }

  const gender = newGender( {
    value: json['gender']
  } )

  if ( gender.isErr() ) {
    err.push( gender.unwrapErr() )
  }

  const id = newPassengerID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const name = newPassengerName( {
    value: json['name'] ?? ''
  } )

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const lastName = newPassengerLastName( {
    value: json['lastName'] ?? ''
  } )

  if ( lastName.isErr() ) {
    err.push( lastName.unwrapErr() )
  }

  const description = newPassengerDescription( {
    value: json['description'] ?? ''
  } )

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const phone = newPassengerPhone( {
    value: json['phone'] ?? ''
  } )

  if ( phone.isErr() ) {
    err.push( ...phone.unwrapErr() )
  }

  const birthDay = newPassengerBirthDay( {
    value: json['birthDay'] ?? ''
  } )

  if ( birthDay.isErr() ) {
    err.push( birthDay.unwrapErr() )
  }

  const country = newPassengerCountry( {
    value: json['country'] ?? ''
  } )

  if ( country.isErr() ) {
    err.push( country.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id         : id.unwrap(),
      userID     : userID.unwrap(),
      name       : name.unwrap(),
      lastName   : lastName.unwrap(),
      description: description.unwrap(),
      phone      : phone.unwrap(),
      birthDay   : birthDay.unwrap(),
      country    : country.unwrap(),
      gender     : gender.unwrap(),
      preferences: preferences
    }
  )
}
