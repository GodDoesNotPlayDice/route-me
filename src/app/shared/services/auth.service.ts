import { Injectable } from '@angular/core'
import {
  Err,
  None,
  Ok,
  Option,
  Result,
  Some
} from 'oxide.ts'
import { loginUser } from 'src/package/authentication/application/login-user'
import { registerUser } from 'src/package/authentication/application/register-user'
import { AuthRepository } from 'src/package/authentication/domain/repository/auth-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerRepository } from 'src/package/passenger/domain/repository/passenger-repository'
import { User } from 'src/package/user/domain/models/user'
import { newUserEmail } from 'src/package/user/domain/models/user-email'
import { newUserPassword } from 'src/package/user/domain/models/user-password'

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor(
    private authRepository: AuthRepository,
    private passengerRepository: PassengerRepository
  )
  { }

  currentUser: Option<User>           = None
  currentPassenger: Option<Passenger> = None

  async userLogin( email: string,
    password: string ): Promise<Result<boolean, string>> {
    console.log( 'login', email, password )

    const result = await loginUser(
      this.authRepository,
      newUserEmail( {
        value: email
      } ),
      newUserPassword( {
        value: password
      } )
    )

    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    this.currentUser = Some( result.unwrap() )
    return Promise.resolve( Ok( true ) )
  }

  async userRegister(
    email: string,
    password: string
  ): Promise<Result<boolean, string>> {
    console.log( 'register', email, password )
    //TODO: deberia devolver un string, en caso de token

    const result = await registerUser(
      this.authRepository,
      newUserEmail( {
        value: email
      } ),
      newUserPassword( {
        value: password
      } )
    )

    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( true ) )
  }

  async registerPassenger( props: Omit<Passenger, 'id'> ): Promise<Result<boolean, string>> {
    console.log( 'register passenger', props )

    const result   = await this.passengerRepository.registerPassenger(
      { ...props } )

    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
}
