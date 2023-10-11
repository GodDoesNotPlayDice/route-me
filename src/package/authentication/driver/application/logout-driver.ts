import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthDriverRepository } from 'src/package/authentication/driver/domain/auth-driver-repository'
import { UserID } from 'src/package/user/domain/models/user-id'

export const logoutDriver = async (
  repository: AuthDriverRepository,
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
