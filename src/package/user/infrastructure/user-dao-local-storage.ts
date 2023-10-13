import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Storage } from '@ionic/storage-angular'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/dao/user-dao'

export class UserDaoLocalStorage implements UserDao {

  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
  }

  /**
   * Get user by id
   * @throws {UserNotFoundException} - if user not found
   */
  async getById( id: UserID ): Promise<Result<User, Error>> {
    return Err(new UserNotFoundException('local storage'))
  }

  /**
   * Get all users
   * @throws {UserNotFoundException} - if users not found
   */
  async getAll(): Promise<Result<User[], Error>> {
    return Err(new UserNotFoundException('local storage'))
  }
}
