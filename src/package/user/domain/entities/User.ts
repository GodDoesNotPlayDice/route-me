import { PreferenceID } from 'src/package/preference'
import { Gender } from 'src/package/shared'
import {
  UserBirthDay,
  UserCountry,
  UserDescription,
  UserEmail,
  UserID,
  UserLastName,
  UserName,
  UserPassword,
  UserPhone
} from '../value-objects'

export class User {
  private constructor(
    readonly id: UserID,
    readonly email: UserEmail,
    readonly name: UserName,
    readonly lastName: UserLastName,
    readonly password: UserPassword,
    readonly description: UserDescription,
    readonly phone: UserPhone,
    readonly birthDay: UserBirthDay,
    readonly country: UserCountry,
    readonly gender: Gender,
    readonly preferences: PreferenceID[]
  )
  {}

  static from(
    id: UserID,
    email: UserEmail,
    name: UserName,
    lastName: UserLastName,
    password: UserPassword,
    description: UserDescription,
    phone: UserPhone,
    birthDay: UserBirthDay,
    country: UserCountry,
    gender: Gender,
    preferences: PreferenceID[]
  ): User {
    return new User(
      id,
      email,
      name,
      lastName,
      password,
      description,
      phone,
      birthDay,
      country,
      gender,
      preferences
    )
  }
}
