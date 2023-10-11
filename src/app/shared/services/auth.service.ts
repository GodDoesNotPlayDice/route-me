import { Injectable } from '@angular/core'
import {
  Err,
  None,
  Ok,
  Option,
  Result,
  Some
} from 'oxide.ts'
import { loginPassenger } from 'src/package/authentication/passenger/application/login-passenger'
import { logoutPassenger } from 'src/package/authentication/passenger/application/logout-passenger'
import { loginUser } from 'src/package/authentication/user/application/login-user'
import { registerPassenger } from 'src/package/authentication/passenger/application/register-passenger'
import { logoutUser } from 'src/package/authentication/user/application/logout-user'
import { registerUser } from 'src/package/authentication/user/application/register-user'
import { AuthPassengerRepository } from 'src/package/authentication/passenger/domain/auth-passenger-repository'
import { AuthUserRepository } from 'src/package/authentication/user/domain/auth-user-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor(
    private authRepository: AuthUserRepository,
    private passengerRepository: AuthPassengerRepository
  )
  { }

  currentUser: Option<User>           = None
  currentPassenger: Option<Passenger> = None

  async userLogin( email: string,
    password: string ): Promise<Result<boolean, string>> {
    const result = await loginUser( this.authRepository, email, password )

    if ( result.isErr() ) {
      console.log( 'error auth' )
      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    this.currentUser = Some( result.unwrap() )

    return Promise.resolve( Ok( true ) )
  }

  async passengerLogin(): Promise<Result<boolean, string>> {
    const passengerResult = await loginPassenger( this.passengerRepository,
      this.currentUser.unwrap().id )

    if ( passengerResult.isErr() ) {
      return Promise.resolve( Err( passengerResult.unwrapErr() ) )
    }

    this.currentPassenger = Some( passengerResult.unwrap() )

    return Promise.resolve( Ok( true ) )
  }


  async userRegister(
    email: string,
    password: string
  ): Promise<Result<boolean, string>> {
    //TODO: deberia devolver un string, en caso de token
    const result = await registerUser(
      this.authRepository, email, password
    )

    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    const userLogResult = await this.userLogin( email, password )

    if ( userLogResult.isErr() ) {
      return Promise.resolve( Err( userLogResult.unwrapErr() ) )
    }

    return Promise.resolve( Ok( true ) )
  }


  async updatePassenger( props: Partial<Passenger> ): Promise<Result<boolean, string>> {
    const newPassenger: Passenger = {
      ...this.currentPassenger.unwrap(),
      ...props
    }

    const result = await this.passengerRepository.update( newPassenger )
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    this.currentPassenger = Some( newPassenger )
    return Promise.resolve( Ok( true ) )
  }

  async registerPassenger( props: {
    name: string,
    lastName: string,
    phone: string,
    birthDay: Date,
    country: string,
    gender: string
  } ): Promise<Result<string, string>> {
    //TODO: ver si register devuelve token o entidad
    const result = await registerPassenger( this.passengerRepository, {
      ...props,
      userID: this.currentUser.unwrap().id
    } )

    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }

    const passengerResult = await this.passengerLogin()

    if ( passengerResult.isErr() ) {
      return Promise.resolve( Err( passengerResult.unwrapErr() ) )
    }

    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }

  async authLogout( id: UserID ): Promise<Result<boolean, string>> {
    const resultUser = await logoutUser(this.authRepository, id )

    if ( resultUser.isErr() ) {
      return Promise.resolve( Err( resultUser.unwrapErr() ) )
    }

    this.currentUser = None

    const resultPassenger = await logoutPassenger(this.passengerRepository, id)

    if ( resultPassenger.isErr() ) {
      return Promise.resolve( Err( resultPassenger.unwrapErr() ) )
    }
    //TODO: talvez manejar si uno si se hace y el otro no
    this.currentPassenger = None

    return Promise.resolve( Ok( true ) )
  }

}
