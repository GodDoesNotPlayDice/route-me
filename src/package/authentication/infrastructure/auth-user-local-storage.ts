import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { Email } from 'src/package/shared/domain/models/email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { Password } from 'src/package/shared/domain/models/password'

export class AuthUserLocalStorage implements AuthUserRepository {
  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
  }

  /**
   * Logout user
   * @throws {UnknownException} - if unknown error
   */
  async logout( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'logout local storage' ) )
  }

  /**
   * Login user
   * @throws {UserNotFoundException} - if user not found
   */
  async login( email: Email,
    password: Password ): Promise<Result<User, Error[]>> {
    const errors: Error[] = []
    errors.push( new UserNotFoundException( 'login local storage' ) )
    return Err( errors )
  }

  /**
   * Register user
   * @throws {UnknownException} - if unknown error
   */
  async register( user: User,
    password: Password ): Promise<Result<string, Error>> {
    return Err( new UnknownException( 'register local storage' ) )

  }

  /**
   * Delete user
   * @throws {UnknownException} - if unknown error
   */
  async delete( email : Email ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'delete local storage' ) )

  }

  /**
   * Update user
   * @throws {UnknownException} - if unknown error
   */
  async update( user: User ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'update local storage' ) )
  }

  /**
   * Get user by email
   * @throws {UnknownException} - if unknown error
   */
  async getByEmail( email: Email ): Promise<Result<boolean, Error[]>> {
    return Err( [new UnknownException( 'get by email memory' )] )
  }
}
