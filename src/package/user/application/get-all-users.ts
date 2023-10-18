import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

/**
 * Get all users
 * @throws {UserNotFoundException} - if users not found
 */
export const getAllUsers = async ( repository: UserDao ): Promise<Result<User[], Error[]>> => {
  const result = await repository.getAll()

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
