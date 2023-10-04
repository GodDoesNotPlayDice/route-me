import { Result } from 'oxide.ts'
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
import {
  newPassengerID,
  PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'
import {
  Gender,
} from 'src/package/shared/domain/models/gender'
import {
  UserID
} from 'src/package/user/domain/models/user-id'

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

export const newPassenger = ( props: PassengerProps ): Passenger => {
  return {
    id         : newPassengerID( {
      value: props.id
    } ),
    userID     : props.userID,
    name       : newPassengerName( {
      value: props.name
    } ),
    lastName   : newPassengerLastName( {
      value: props.lastName
    } ),
    description: newPassengerDescription( {
      value: props.description
    } ),
    phone      : newPassengerPhone( {
      value: props.phone
    } ),
    birthDay   : newPassengerBirthDay( {
      value: props.birthDay
    } ),
    country    : newPassengerCountry( {
      value: props.country
    } ),
    gender     : props.gender,
    preferences: props.preferences
  }
}

export const newPassengerResult = ( props: PassengerProps ): Promise<Result<Passenger, Error[]>> => {


  return {
    id         : newPassengerID( {
      value: props.id
    } ),
    userID     : props.userID,
    name       : newPassengerName( {
      value: props.name
    } ),
    lastName   : newPassengerLastName( {
      value: props.lastName
    } ),
    description: newPassengerDescription( {
      value: props.description
    } ),
    phone      : newPassengerPhone( {
      value: props.phone
    } ),
    birthDay   : newPassengerBirthDay( {
      value: props.birthDay
    } ),
    country    : newPassengerCountry( {
      value: props.country
    } ),
    gender     : props.gender,
    preferences: props.preferences
  }
}

