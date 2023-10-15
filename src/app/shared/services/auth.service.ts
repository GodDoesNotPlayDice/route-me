import { Injectable } from '@angular/core'
import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { getUserByEmail } from 'src/package/authentication/application/get-user-by-email'
import { loginUser } from 'src/package/authentication/application/login-user'
import { logoutUser } from 'src/package/authentication/application/logout-user'
import { registerUser } from 'src/package/authentication/application/register-user'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { Driver } from 'src/package/driver/domain/models/driver'
import { createPassenger } from 'src/package/passenger/application/create-passenger'
import { updatePassenger } from 'src/package/passenger/application/update-passenger'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor(
    private authRepository: AuthUserRepository,
    private passengerDao: PassengerDao
  )
  { }

  currentUser: Option<User>           = None
  currentDriver: Option<Driver>       = None
  currentPassenger: Option<Passenger> = None

  async userLogin( email: string,
    password: string ): Promise<boolean> {
    const result = await loginUser( this.authRepository, email, password )

    if ( result.isErr() ) {
      console.log( 'user login error' )
      console.log( result.unwrapErr() )
      return false
    }

    this.currentUser = Some( result.unwrap() )

    return true
  }

  async getPassenger(): Promise<boolean> {

    const passengerResult = await this.passengerDao.getById(
      this.currentUser.unwrap().id )

    if ( passengerResult.isErr() ) {
      console.log( 'get passenger error' )
      console.log( passengerResult.unwrapErr() )
      return false
    }

    this.currentPassenger = Some( passengerResult.unwrap() )

    return true
  }


  async userRegister(
    email: string,
    password: string
  ): Promise<boolean> {
    //TODO: deberia devolver un string, en caso de token
    const result = await registerUser(
      this.authRepository, email, password
    )

    if ( result.isErr() ) {
      console.log( 'user register error' )
      console.log( result.unwrapErr() )
      return false
    }

    return await this.userLogin( email, password )
  }


  async updatePassenger( partialProps: {
    name?: string,
    lastName?: string,
    description?: string,
    preferences?: string[],
    phone?: string,
    birthDay?: Date,
    country?: string,
    gender?: string
  } ): Promise<boolean> {
    if ( this.currentPassenger.isNone() ) {
      return false
    }
    const result = await updatePassenger( this.passengerDao,
      this.currentPassenger.unwrap(), partialProps )

    if ( result.isErr() ) {
      console.log( 'update passenger error' )
      console.log( result.unwrapErr() )
      return false
    }

    this.currentPassenger = Some( result.unwrap() )
    return true
  }

  async registerPassenger( props: {
    name: string,
    lastName: string,
    phone: string,
    birthDay: Date,
    country: string,
    gender: string
  } ): Promise<boolean> {
    //TODO: ver si register devuelve token o entidad
    const result = await createPassenger( this.passengerDao, {
      name    : props.name,
      lastName: props.lastName,
      phone   : props.phone,
      birthDay: props.birthDay,
      country : props.country,
      gender  : props.gender,
      userID  : this.currentUser.unwrap().id
    } )

    if ( result.isErr() ) {
      console.log( 'register passenger error' )
      console.log( result.unwrapErr() )
      return false
    }

    this.currentPassenger = Some( result.unwrap() )

    return true
  }

  async authLogout( id: UserID ): Promise<boolean> {
    const resultUser = await logoutUser( this.authRepository, id )

    if ( resultUser.isErr() ) {
      console.log( 'user authLogout error' )
      console.log( resultUser.unwrapErr() )
      return false
    }

    this.currentUser      = None
    this.currentPassenger = None

    return true
  }

  async checkUserEmail( email: string ): Promise<boolean> {
    const existResult = await getUserByEmail(this.authRepository, email)
    if ( existResult.isErr() ){
      return false
    }
    return true
  }

}
