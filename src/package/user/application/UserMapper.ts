import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { PreferenceID } from 'src/package/preference'
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
  static fromJson(
    json: Record<string, any>
  ): Option<User> {
    try {
      const preferences = json['preferences'].map( ( preference: any ) => {
        return new PreferenceID( preference.name )
      } )

      return Some(
        User.from(
          new UserID( json['id'] ),
          new UserEmail( json['email'] ),
          new UserName( json['name'] ),
          new UserLastName( json['lastName'] ),
          new UserDescription( json['description'] ),
          new UserPassword( json['password'] ),
          new UserPhone( json['phone'] ),
          new UserBirthDay( json['birthDay'] ),
          new UserCountry( json['country'] ),
          new Gender( json['gender'] ),
          preferences
        )
      )
    }
    catch ( e ) {
      return None
    }
  }
}
