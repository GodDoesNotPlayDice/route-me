import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain/repository/auth-repository'
import {
  newUser,
  User
} from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'
import { ulid } from 'ulidx'

export class AuthMemory implements AuthRepository {
  constructor(private context: User[]) {}

  async login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    for ( const user of this.context ) {
      if ( user.email.value === email.value)
      {
        return Promise.resolve( Ok( user ) )
      }
    }
    return Promise.resolve( Err( 'memory error' ) )
  }

  register( email: UserEmail,
    password: UserPassword ): Promise<Result<boolean, string>> {
    try {
      this.context.push( newUser({
        id: ulid(),
        email: email.value,
      }) )
      return Promise.resolve( Ok( true ) )
    }
    catch ( e ) {
      return Promise.resolve( Err( 'memory error' ) )
    }
  }

  async create( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async update( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }
}
