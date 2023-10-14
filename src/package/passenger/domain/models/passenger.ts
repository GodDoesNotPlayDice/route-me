import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  newPassengerBirthDay,
  PassengerBirthDay
} from 'src/package/passenger/domain/models/passenger-birth-day'
import {
  newPassengerCountry,
  PassengerCountry
} from 'src/package/passenger/domain/models/passenger-country'
import {
  newPassengerDescription,
  PassengerDescription
} from 'src/package/passenger/domain/models/passenger-description'
import {
  newPassengerID,
  PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import {
  newPassengerLastName,
  PassengerLastName
} from 'src/package/passenger/domain/models/passenger-last-name'
import {
  newPassengerName,
  PassengerName
} from 'src/package/passenger/domain/models/passenger-name'
import {
  newPassengerPhone,
  PassengerPhone
} from 'src/package/passenger/domain/models/passenger-phone'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'
import { Gender } from 'src/package/shared/domain/models/gender'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface Passenger {
  id: PassengerID
  userID: UserID
  name: PassengerName
  lastName: PassengerLastName
  description: PassengerDescription
  phone: PassengerPhone
  birthDay: PassengerBirthDay
  country: PassengerCountry
  gender: Gender
  preferences: PreferenceID[]
}

export interface PassengerProps {
  id: string,
  userID: UserID,
  name: string,
  lastName: string,
  description: string,
  phone: string,
  birthDay: Date,
  country: string,
  gender: Gender,
  preferences: PreferenceID[]
}

/**
 * Create a passenger instance
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 */
export const newPassenger = ( props: PassengerProps ): Result<Passenger, Error[]> => {
  const err: Error[] = []

  const id = newPassengerID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const name = newPassengerName( {
    value: props.name
  } )

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const lastName = newPassengerLastName( {
    value: props.lastName
  } )

  if ( lastName.isErr() ) {
    err.push( lastName.unwrapErr() )
  }

  const description = newPassengerDescription( {
    value: props.description
  } )

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const phone = newPassengerPhone( {
    value: props.phone
  } )

  if ( phone.isErr() ) {
    err.push( ...phone.unwrapErr() )
  }

  const birthDay = newPassengerBirthDay( {
    value: props.birthDay
  } )

  if ( birthDay.isErr() ) {
    err.push( birthDay.unwrapErr() )
  }

  const country = newPassengerCountry( {
    value: props.country
  } )

  if ( country.isErr() ) {
    err.push( country.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id         : id.unwrap(),
      userID     : props.userID,
      name       : name.unwrap(),
      lastName   : lastName.unwrap(),
      description: description.unwrap(),
      phone      : phone.unwrap(),
      birthDay   : birthDay.unwrap(),
      country    : country.unwrap(),
      gender     : props.gender,
      preferences: props.preferences
    }
  )
}
