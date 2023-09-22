import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
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
import { UserMapper } from '../application/UserMapper'

export class AuthDataMemory implements AuthRepository {
  constructor() {
  }

  getAll(): Promise<Result<User[], string>> {

    return Promise.resolve( Err( 'err' ) )
  }

  private context: User[] = defaultUsers

  async login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    for ( const user of this.context ) {
      if ( user.email.value === email.value && user.password.value ===
        password.value )
      {
        const data: Record<string, any> = {
          id         : user.id.value,
          email      : user.email.value,
          name       : user.name.value,
          lastName   : user.lastName.value,
          password   : user.password.value,
          description: user.description.value,
          phone      : user.phone.value,
          birthDay   : user.birthDay.value,
          country    : user.country.value,
          gender     : user.gender.value,
          preferences: user.preferences
        }
        const response                  = UserMapper.fromJson( data )

        if ( response.isNone() ) {
          return Promise.resolve( Err( 'map error' ) )
        }

        return Promise.resolve( Ok( user ) )
      }
    }
    return Promise.resolve( Err( 'memory error' ) )
  }

  register( user: User ): Promise<Result<boolean, string>> {
    try {
      this.context.push( user )
      return Promise.resolve( Ok( true ) )
    }
    catch ( e ) {
      return Promise.resolve( Err( 'memory error' ) )
    }
  }
}

export const defaultUsers: User[] = [
  User.from(
    new UserID( 'abc' ),
    new UserEmail( 'hola@gmail.com' ),
    new UserName( 'juan' ),
    new UserLastName( 'pedro' ),
    new UserPassword( '12345678' ),
    new UserDescription(
      'Soy un estudiante de ingeniería civil en informática, me gusta la programación y el desarrollo de software.' ),
    new UserPhone( '(+56)1234-1234' ),
    new UserBirthDay( new Date( '1990-03-25' ) ),
    new UserCountry( 'CL' ),
    new Gender( 'Hombre' ),
    []
  )
]
