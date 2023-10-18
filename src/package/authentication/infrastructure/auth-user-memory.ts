import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { Email } from 'src/package/shared/domain/models/email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { Password } from 'src/package/shared/domain/models/password'

export class AuthUserMemory implements AuthUserRepository {
  constructor( private context: User[] ) {}

  /**
   * Logout user
   * @throws {UnknownException} - if unknown error
   */
  async logout( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'logout memory' ) )
  }

  /**
   * Login user
   * @throws {UserNotFoundException} - if user not found
   */
  async login( email: Email,
    password: Password ): Promise<Result<User, Error[]>> {
    for ( const user of this.context ) {
      if ( user.email.value === email.value )
      {
        return Ok( user )
      }
    }
    const errors: Error[] = []
    errors.push( new UserNotFoundException( 'login memory' ) )
    return Err( errors )
  }

  /**
   * Register user
   * @throws {UnknownException} - if unknown error
   */
  async register( user: User,
    password: Password ): Promise<Result<string, Error>> {
    try {
      this.context.push( user )
      return Ok( 'id' )
    }
    catch ( e ) {
      return Err( new UnknownException( 'register memory' ) )
    }
  }

  /**
   * Delete user
   * @throws {UnknownException} - if unknown error
   */
  async delete( email : Email ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'delete memory' ) )
  }

  /**
   * Update user
   * @throws {UnknownException} - if unknown error
   */
  async update( user: User ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'update memory' ) )
  }

  /**
   * Get user by email
   * @throws {UnknownException} - if unknown error
   */
  async getByEmail( email: Email ): Promise<Result<boolean, Error[]>> {
    return Err( [new UnknownException( 'get by email memory' )] )
  }
}
