import { Injectable } from '@angular/core'
import {
  Err,
  None,
  Ok,
  Option,
  Result,
  Some
} from 'oxide.ts'
import { UserRegisterState } from 'src/app/state/user-register/user-register.state'
import {
  UserEmail,
  UserMapper,
  UserPassword
} from 'src/package/user'
import { LoginUser } from 'src/package/user/application/LoginUser'
import { RegisterUser } from 'src/package/user/application/RegisterUser'
import { User } from 'src/package/user/domain/entities/User'

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor(
    private loginUser: LoginUser,
    private registerUser: RegisterUser
  )
  { }

  currentUser: Option<User> = None

  async login( email: string,
    password: string ): Promise<Result<boolean, string>> {

    const result = await this.loginUser.execute(
      new UserEmail( email ),
      new UserPassword( password )
    )


    if ( result.isErr() ) {

      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    this.currentUser = Some( result.unwrap() )
    return Promise.resolve( Ok( true ) )
  }

  async register(
    user: UserRegisterState
  ): Promise<Result<boolean, string>> {
    const u = UserMapper.fromJson( user )

    if ( u.isNone() ) {
      return Promise.resolve( Err( 'er' ) )
    }

    const uw = u.unwrap()

    const result = await this.registerUser.execute(
      uw.email,
      uw.name,
      uw.lastName,
      uw.password,
      uw.description,
      uw.phone,
      uw.country,
      uw.birthDay,
      uw.gender,
      uw.preferences
    )
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( true ) )
  }
}
