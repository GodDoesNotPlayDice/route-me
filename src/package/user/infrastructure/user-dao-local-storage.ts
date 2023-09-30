import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Storage } from '@ionic/storage-angular'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/repository/user-dao'

export class UserDaoLocalStorage implements UserDao {

  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
  }

  public getById( id: UserID ): Promise<Result<User, string>> {
    return Promise.resolve( Err('') )
  }

  public getAll(): Promise<Result<User[], string>> {
    return Promise.resolve( Ok([]) )
  }
}
