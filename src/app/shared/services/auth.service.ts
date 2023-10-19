import { Injectable } from '@angular/core'
import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { loginUser } from 'src/package/authentication/application/login-user'
import { logoutUser } from 'src/package/authentication/application/logout-user'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { createUser } from 'src/package/user/application/create-user'
import { deleteUser } from 'src/package/user/application/delete-user'
import { getUserByEmail } from 'src/package/user/application/get-user-by-email'
import { updateUser } from 'src/package/user/application/update-user'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor(
    private authRepository: AuthUserRepository,
    private userDao: UserDao
  )
  { }

  currentUser: Option<User> = None

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

  async userRegister(
    email: string,
    password: string
  ): Promise<boolean> {
    //TODO: deberia devolver un string, en caso de token
    const result = await createUser(
      this.userDao, email, password
    )

    if ( result.isErr() ) {
      console.log( 'user register error' )
      console.log( result.unwrapErr() )
      return false
    }

    return await this.userLogin( email, password )
  }


  async updateUser( partialProps: {
    email?: string,
    image?: string,
    name?: string,
    lastName?: string,
    description?: string,
    preferences?: string[],
    phone?: string,
    birthDay?: Date,
    country?: string,
    gender?: string,
  } ): Promise<boolean> {
    if ( this.currentUser.isNone() ) {
      return false
    }
    const result = await updateUser( this.userDao,
      this.currentUser.unwrap(), partialProps )

    if ( result.isErr() ) {
      console.log( 'update passenger error' )
      console.log( result.unwrapErr() )
      return false
    }

    this.currentUser = Some( result.unwrap() )
    return true
  }

  async authLogout( id: UserID ): Promise<boolean> {
    const resultUser = await logoutUser( this.authRepository, id )

    if ( resultUser.isErr() ) {
      console.log( 'user authLogout response error' )
      console.log( resultUser.unwrapErr() )
    }
    //TODO: quitar token
    this.currentUser = None
    return true
  }

  async checkUserEmail( email: string ): Promise<boolean> {
    const existResult = await getUserByEmail( this.userDao, email )
    if ( existResult.isErr() ) {
      return false
    }
    return true
  }

  async deleteAccount(): Promise<boolean> {
    if ( this.currentUser.isNone() ) {
      return false
    }
    await deleteUser( this.userDao, this.currentUser.unwrap().email )

    this.currentUser = None
    return true
  }
}
