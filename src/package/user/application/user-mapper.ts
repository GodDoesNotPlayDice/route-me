import {
  Err,
  None,
  Ok,
  Result,
  Some
} from 'oxide.ts'
import {
  driverFromJson,
  driverToJson
} from 'src/package/driver/application/driver-mapper'
import {
  preferenceFromJson,
  preferenceToJson
} from 'src/package/preference/application/preference-mapper'
import { Preference } from 'src/package/preference/domain/models/preference'
import {
  ratingFromJson,
  ratingToJson
} from 'src/package/rating/application/rating-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newGender } from 'src/package/shared/domain/models/gender'
import { newPhone } from 'src/package/shared/domain/models/phone'
import { User } from 'src/package/user/domain/models/user'
import { newUserBirthDay } from 'src/package/user/domain/models/user-birth-day'
import { newUserCountry } from 'src/package/user/domain/models/user-country'
import { newUserDescription } from 'src/package/user/domain/models/user-description'
import { newUserID } from 'src/package/user/domain/models/user-id'
import { newUserLastName } from 'src/package/user/domain/models/user-last-name'
import { newUserName } from 'src/package/user/domain/models/user-name'

/**
 * Create a json from user instance
 * @throws {UnknownException} - if unknown error
 */
export const userToJson = ( user: User ): Result<Record<string, any>, Error[]> => {
  try {
    const err: Error[] = []

    const json: Record<string, any> = {
      id         : user.id.value,
      email      : user.email.value,
      name       : user.name.value,
      last_name  : user.lastName.value,
      description: user.description.value,
      gender     : user.gender,
      country    : user.country,
      birth_day  : user.birthDay,
      phone      : user.phone
    }

    const rating = ratingToJson( user.rating )

    if ( rating.isErr() ) {
      err.push( rating.unwrapErr() )
    }
    else {
      json['rating'] = rating.unwrap()
    }

    if ( user.driver.isSome() ) {
      const driver = driverToJson( user.driver.unwrap() )

      if ( driver.isErr() ) {
        err.push( ...driver.unwrapErr() )
      }
      else {
        json['driver'] = driver.unwrap()
      }
    }

    const preferences: Record<string, any>[] = []
    for ( const preference of user.preferences ) {
      const preferenceResult = preferenceToJson( preference )

      if ( preferenceResult.isErr() ) {
        err.push( preferenceResult.unwrapErr() )
      }
      else {
        preferences.push( preferenceResult.unwrap() )
      }
    }

    if ( preferences.length > 0 ) {
      json['preferences'] = preferences
    }

    if ( err.length > 0 ) {
      return Err( err )
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
 * @throws {UserNameInvalidException} - if name is invalid
 * @throws {UserLastNameInvalidException} - if last name is invalid
 * @throws {UserDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
 * @throws {UserBirthDayInvalidException} - if birthday is invalid
 * @throws {UserCountryInvalidException} - if country is invalid
 * @throws {PreferenceIdInvalidException} - if preference id is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 * @throws {DriverIdInvalidException} - if driver id is invalid
 * @throws {DriverDocumentIdInvalidException} - if driver document id is invalid
 * @throws {DriverDocumentNameInvalidException} - if driver document name is invalid
 * @throws {DriverDocumentReferenceInvalidException} - if driver document reference is invalid
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

  const name = newUserName( {
    value: json['name'] ?? ''
  } )

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const lastName = newUserLastName( {
    value: json['last_name'] ?? ''
  } )

  if ( lastName.isErr() ) {
    err.push( lastName.unwrapErr() )
  }

  const description = newUserDescription( {
    value: json['description'] ?? ''
  } )

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const gender = newGender( {
    value: json['gender'] ?? ''
  } )

  if ( gender.isErr() ) {
    err.push( gender.unwrapErr() )
  }

  const country = newUserCountry( {
    value: json['country'] ?? ''
  } )

  if ( country.isErr() ) {
    err.push( country.unwrapErr() )
  }

  const birthDay = newUserBirthDay( {
    value: json['birth_day'] ?? ''
  } )

  if ( birthDay.isErr() ) {
    err.push( birthDay.unwrapErr() )
  }

  const phone = newPhone( {
    value: json['phone'] ?? ''
  } )

  if ( phone.isErr() ) {
    err.push( ...phone.unwrapErr() )
  }

  //TODO: verificar como se comporta null
  const rating = ratingFromJson( json['rating'] )

  if ( rating.isErr() ) {
    err.push( ...rating.unwrapErr() )
  }

  const preferences: Preference[] = []
  if ( json['preferences'] !== undefined ) {
    for ( const preference of Object.values( json['preferences'] ) ) {
      const preferenceResult = preferenceFromJson(
        preference as Record<string, any> )

      if ( preferenceResult.isErr() ) {
        err.push( ...preferenceResult.unwrapErr() )
      }
      else {
        preferences.push( preferenceResult.unwrap() )
      }
    }
  }

  const driver = driverFromJson( json['driver'] )

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    id         : id.unwrap(),
    email      : email.unwrap(),
    name       : name.unwrap(),
    lastName   : lastName.unwrap(),
    description: description.unwrap(),
    gender     : gender.unwrap(),
    phone      : phone.unwrap(),
    country    : country.unwrap(),
    birthDay   : birthDay.unwrap(),
    rating     : rating.unwrap(),
    preferences: preferences,
    driver     : driver.isErr() ? None : Some( driver.unwrap() )
  } )
}
