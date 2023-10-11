import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/user/domain/auth-user-repository'
import {
  newUser,
  User
} from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'
import { ulid } from 'ulidx'

export class AuthUserMemory implements AuthUserRepository {
  constructor(private context: User[]) {}

  async logout(id: UserID): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

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
    password: UserPassword ): Promise<Result<string, string>> {
    try {
      this.context.push( newUser({
        id: ulid(),
        email: email.value,
      }) )
      return Promise.resolve( Ok( 'id' ) )
    }
    catch ( e ) {
      return Promise.resolve( Err( 'memory error' ) )
    }
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async update( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( 'error' ) )
  }
}
