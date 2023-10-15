import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { UserID } from 'src/package/user/domain/models/user-id'

export const deletePassenger = async ( repository: PassengerDao, userID : UserID ): Promise<Result<boolean, Error>> => {
  const result   = await repository.delete(userID)

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
