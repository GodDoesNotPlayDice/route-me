import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain/repository/auth-repository'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export const loginUser = async ( repository: AuthRepository,
  email: UserEmail,
  password: UserPassword ): Promise<Result<User, string>> => {
  try {
    const result   = await repository.login( email, password )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
