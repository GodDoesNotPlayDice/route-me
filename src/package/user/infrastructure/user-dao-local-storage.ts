import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  User,
  UserDao,
  UserID
} from 'src/package/user/domain'
import { Storage } from '@ionic/storage-angular'

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
