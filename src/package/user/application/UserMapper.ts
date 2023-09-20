import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { Gender } from 'src/package/shared'
import {
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

export class UserMapper {
  // fromJSON
  static fromJson(
    json : Record<string, any>
  ): Option<User>{
    try {
      //TODO: corroborar data
      const preferences = json['preferences'].map((preference : any) => {
        return preference.id
      })

      return Some(
        User.from(
          new UserID(json['id']),
          new UserEmail(json['email']),
          new UserName(json['name']),
          new UserLastName(json['lastName']),
          new UserDescription(json['description']),
          new UserPassword(json['password']),
          new UserPhone(json['phone']),
          new UserBirthDay(json['birthDay']),
          new UserCountry(json['country']),
          new Gender(json['gender']),
          preferences
        )
      )
    }
    catch (e){
      return None
    }
  }
}
