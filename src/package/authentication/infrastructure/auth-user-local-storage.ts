import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

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
  async login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, Error[]>> {
    const errors: Error[] = []
    errors.push( new UserNotFoundException( 'login local storage' ) )
    return Err( errors )
  }

  /**
   * Register user
   * @throws {UnknownException} - if unknown error
   */
  async register( user: User,
    password: UserPassword ): Promise<Result<string, Error>> {
    return Err( new UnknownException( 'register local storage' ) )

  }

  /**
   * Delete user
   * @throws {UnknownException} - if unknown error
   */
  async delete( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'delete local storage' ) )

  }

  /**
   * Update user
   * @throws {UnknownException} - if unknown error
   */
  async update( user: User ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'update local storage' ) )
  }
}
