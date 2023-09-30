import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import {
  UserEmail,
  UserPassword
} from 'src/package/user'

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
