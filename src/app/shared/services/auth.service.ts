import { Injectable } from '@angular/core'
import {
  Err,
  None,
  Ok,
  Option,
  Result,
  Some
} from 'oxide.ts'
import {
  LoginUser,
  RegisterUser
} from 'src/package/authentication'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { User } from 'src/package/user/domain/models'

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
  currentPassenger: Option<Passenger> = None

  async login( email: string,
    password: string ): Promise<Result<boolean, string>> {

    const result = await this.loginUser.execute(
      email,
      password
    )

    if ( result.isErr() ) {

      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    this.currentUser = Some( result.unwrap() )
    return Promise.resolve( Ok( true ) )
  }

  async register(
    email: string,
    password: string
  ): Promise<Result<boolean, string>> {
    console.log( 'register', email, password)
    //TODO: deberia devolver un string, en caso de token
    const result = await this.registerUser.execute(
      email,
      password,
    )
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( true ) )
  }
}
