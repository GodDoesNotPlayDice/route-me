import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import {
  User,
  UserEmail,
  UserPassword
} from 'src/package/user'

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
