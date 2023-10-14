import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import {
  newPassenger,
  Passenger
} from 'src/package/passenger/domain/models/passenger'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'
import { newGender } from 'src/package/shared/domain/models/gender'

//TODO: agregar posibles throws
export const updatePassenger = async ( repository: PassengerDao,
  passenger: Passenger, partialProps: {
    name?: string,
    lastName?: string,
    description?: string,
    preferences?: PreferenceID[],
    phone?: string,
    birthDay?: Date,
    country?: string,
    gender?: string
  } ): Promise<Result<Passenger, Error[]>> => {
  const error: Error[] = []

  const genderResult = newGender( {
    value: partialProps.gender === undefined
      ? passenger.gender
      : partialProps.gender
  } )

  if ( genderResult.isErr() ) {
    error.push( genderResult.unwrapErr() )
    return Err( error )
  }

  const passengerResult = newPassenger( {
    id         : passenger.id.value,
    name       : partialProps.name === undefined
      ? passenger.name.value
      : partialProps.name,
    lastName   : partialProps.lastName === undefined
      ? passenger.lastName.value
      : partialProps.lastName,
    phone      : partialProps.phone === undefined
      ? passenger.phone.value
      : partialProps.phone,
    birthDay   : partialProps.birthDay === undefined
      ? passenger.birthDay.value
      : partialProps.birthDay,
    country    : partialProps.country === undefined
      ? passenger.country.value
      : partialProps.country,
    description: partialProps.description === undefined
      ? passenger.description.value
      : partialProps.description,
    preferences: partialProps.preferences === undefined
      ? passenger.preferences
      : partialProps.preferences,
    gender     : genderResult.unwrap(),
    userID     : passenger.userID
  } )

  if ( passengerResult.isErr() ) {
    error.push( ...passengerResult.unwrapErr() )
    return Err( error )
  }

  const result = await repository.update( passengerResult.unwrap() )

  if ( result.isErr() ) {
    error.push( result.unwrapErr() )
    return Err( error )
  }

  return Ok( passengerResult.unwrap() )
}
