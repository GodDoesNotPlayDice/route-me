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
  static toJson(user : User): Option<Record<string, any>> {
    try {
      const preferences = user.preferences
                                .map( ( preference: PreferenceID ) => {
                                  return preference.value
                                } )

      const json : Record<string, any> = {
        id         : user.id.value,
        email      : user.email.value,
        name       : user.name.value,
        lastName   : user.lastName.value,
        password   : user.password.value,
        description: user.description.value,
        phone      : user.phone.value,
        birthDay   : user.birthDay.value,
        country    : user.country.value,
        gender: user.gender.value,
        preferences
      }
      return Some(json)
    }
    catch ( e ) {
      console.log( 'e' )
      console.log( e )
      return None
    }
  }
  //TODO: probar con string
  static fromJson(
    json: Record<string, any>
  ): Option<User> {
    try {
      const preferences = Object.values( json['preferences'] )
                                .map( ( preference: any ) => {
                                  return new PreferenceID( preference.name )
                                } )

      return Some(
        User.from(
          new UserID( json['id'] ),
          new UserEmail( json['email'] ),
          new UserName( json['name'] ),
          new UserLastName( json['lastName'] ),
          new UserPassword( json['password'] ),
          new UserDescription( json['description'] ),
          new UserPhone( json['phone'] ),
          new UserBirthDay( new Date( json['birthDay'] ) ),
          new UserCountry( json['country'] ),
          new Gender( json['gender'] ),
          preferences
        )
      )
    }
    catch ( e ) {
      console.log( 'e' )
      console.log( e )
      return None
    }
  }
}
