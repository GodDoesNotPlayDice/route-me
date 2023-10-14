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
import { newGender } from 'src/package/shared/domain/models/gender'
import { UserID } from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'

export const createPassenger = async ( repository: PassengerDao, props: {
  name: string,
  userID: UserID,
  lastName: string,
  phone: string,
  birthDay: Date,
  country: string,
  gender: string
} ): Promise<Result<Passenger, Error[]>> => {
  const error: Error[] = []

  const genderResult = newGender( {
    value: props.gender
  } )

  if ( genderResult.isErr() ) {
    error.push( genderResult.unwrapErr() )
    return Err( error )
  }

  const passengerResult = newPassenger( {
    id         : ulid(),
    name       : props.name,
    lastName   : props.lastName,
    phone      : props.phone,
    birthDay   : props.birthDay,
    country    : props.country,
    gender     : genderResult.unwrap(),
    description: '',
    preferences: [],
    userID     : props.userID
  } )

  if ( passengerResult.isErr() ) {
    error.push( ...passengerResult.unwrapErr() )
    return Err( error )
  }

  const result = await repository.create( passengerResult.unwrap() )

  if ( result.isErr() ) {
    error.push( result.unwrapErr() )
    return Err( error )
  }

  return Ok( result.unwrap() )
}
