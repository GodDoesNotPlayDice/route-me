import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PreferenceID } from 'src/package/preference'
import { Gender } from 'src/package/shared'
import {
  AuthRepository,
  User,
  UserBirthDay,
  UserCountry,
  UserDescription,
  UserEmail,
  UserID,
  UserLastName,
  UserName,
  UserPassword,
  UserPhone
} from 'src/package/user/domain'

export class RegisterUser {
  constructor(private repository : AuthRepository) {}

  async execute(
    email :UserEmail,
    name :UserName,
    lastName :UserLastName,
    password :UserPassword,
    description :UserDescription,
    phone :UserPhone,
    country :UserCountry,
    birthDay :UserBirthDay,
    gender :Gender,
    preferences: PreferenceID[]
  ): Promise<Result<boolean, string>> {
    try {
      const result = await this.repository.register(
        User.from(
          new UserID(""),
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
      )
      const response = result.unwrap()
      return Promise.resolve(Ok(response))
    } catch (e) {
      return Promise.resolve(Err("register error"));
    }
  }
}
