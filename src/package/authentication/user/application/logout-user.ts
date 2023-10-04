import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/user/domain/auth-user-repository'
import { UserID } from 'src/package/user/domain/models/user-id'

export const logoutUser = async (
  repository: AuthUserRepository,
  id: UserID
): Promise<Result<boolean, string>> => {
  try {
    const result   = await repository.logout(id)
    return Promise.resolve( Ok(result.unwrap()) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'logout error' ) )
  }
}
