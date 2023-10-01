import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export const registerUser = async ( repository: AuthUserRepository,
  email: UserEmail,
  password: UserPassword ): Promise<Result<string, string>> => {
  try {
    const result   = await repository.register( email, password )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
