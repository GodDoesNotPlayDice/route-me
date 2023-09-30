import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain/repository/auth-repository'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export const registerUser = async ( repository: AuthRepository,
  email: UserEmail,
  password: UserPassword ): Promise<Result<boolean, string>> => {
  try {
    const result   = await repository.register( email, password )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
