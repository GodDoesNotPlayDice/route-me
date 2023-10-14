import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
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
import { newGender } from 'src/package/shared/domain/models/gender'
import { UserID } from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'

export const createPassenger = async ( repository: PassengerDao, props: {
  userID: UserID,
  name: string,
  lastName: string,
  phone: string,
  birthDay: Date,
  country: string,
  gender: string
} ): Promise<Result<Passenger, Error[]>> => {
  const err: Error[] = []

  const id = newPassengerID( {
    value: ulid()
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const gender = newGender( {
    value: props.gender
  } )

  if ( gender.isErr() ) {
    err.push( gender.unwrapErr() )
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
    value: ''
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

  const newPassenger : Passenger =  {
    id         : id.unwrap(),
    name       : name.unwrap(),
    lastName   : lastName.unwrap(),
    phone      : phone.unwrap(),
    birthDay   : birthDay.unwrap(),
    country    : country.unwrap(),
    gender     : gender.unwrap(),
    description: description.unwrap(),
    preferences: [],
    userID     : props.userID
  }

  const result = await repository.create( newPassenger )

  if ( result.isErr() ) {
    err.push( result.unwrapErr() )
    return Err( err )
  }

  return Ok( newPassenger )
}
