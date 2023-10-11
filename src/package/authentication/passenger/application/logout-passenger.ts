import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/passenger/domain/auth-passenger-repository'
import { UserID } from 'src/package/user/domain/models/user-id'

export const logoutPassenger = async (
  repository: AuthPassengerRepository,
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
