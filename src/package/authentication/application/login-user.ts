import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import {
  User
} from 'src/package/user'

export class LoginUser {
  constructor( private repository: AuthRepository ) {
  }

  async execute( email: string,
    password: string ): Promise<Result<User, string>> {

    const result = await this.repository.login(
      email,
      password
    )
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( result.unwrap() ) )
  }
}
