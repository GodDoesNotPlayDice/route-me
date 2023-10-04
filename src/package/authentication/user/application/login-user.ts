import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/user/domain/auth-user-repository'
import { User } from 'src/package/user/domain/models/user'
import { newUserEmail } from 'src/package/user/domain/models/user-email'
import { newUserPassword } from 'src/package/user/domain/models/user-password'

export const loginUser = async ( repository: AuthUserRepository,
  email: string,
  password: string ): Promise<Result<User, string>> => {
  try {
    const result   = await repository.login(
      newUserEmail( {
        value: email
      } ),
      newUserPassword( {
        value: password
      } ) )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
