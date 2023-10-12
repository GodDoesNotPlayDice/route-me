import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/repository/user-dao'

export class UserDaoMemory implements UserDao {

  /**
   * Get all users
   * @throws {UserNotFoundException} - if users not found
   */
	async getAll(): Promise<Result<User[], Error>> {
    return Err(new UserNotFoundException('memory'))
  }

  /**
   * Get user by id
   * @throws {UserNotFoundException} - if user not found
   */
	async getById( id: UserID ): Promise<Result<User, Error>> {
    return Err(new UserNotFoundException('memory'))

  }
}
