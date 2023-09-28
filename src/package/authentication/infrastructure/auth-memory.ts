import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import {
  newUser,
  User,
  userFromJson,
  UserID
} from 'src/package/user'

export class AuthMemory implements AuthRepository {
  constructor(private context: User[]) {}

  async login( email: string,
    password: string ): Promise<Result<User, string>> {
    for ( const user of this.context ) {
      if ( user.email.value === email)
      {
        const data: Record<string, any> = {
          id         : user.id.value,
          email      : user.email.value
        }
        const response                  = userFromJson( data )

        if ( response.isNone() ) {
          return Promise.resolve( Err( 'map error' ) )
        }

        return Promise.resolve( Ok( user ) )
      }
    }
    return Promise.resolve( Err( 'memory error' ) )
  }

  register(id: string,
      email: string,
      password: string): Promise<Result<boolean, string>> {
    try {
      this.context.push( newUser({
        id,
        email
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
