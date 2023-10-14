import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Get all users
 * @throws {UserNotFoundException} - if users not found
 * @throws {UserIdInvalidException} - if id is invalid
 */
export const getUserById = async ( repository: UserDao,
  id: string ): Promise<Result<User, Error>> => {
  const idResult = newUserID( {
    value: id
  } )

  if ( idResult.isErr() ) {
    return Err( idResult.unwrapErr() )
  }

  const result = await repository.getById( idResult.unwrap() )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
