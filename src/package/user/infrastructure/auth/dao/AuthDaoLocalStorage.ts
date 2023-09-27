import {
  Ok,
  Result
} from 'oxide.ts'
import {
  AuthDAO,
  User,
  UserID
} from 'src/package/user/domain'
import { Storage } from '@ionic/storage-angular'

export class AuthDaoLocalStorage implements AuthDAO {

  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
  }

  public create( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }

  public delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }

  public getAll(): Promise<Result<User[], string>> {
    return Promise.resolve( Ok([]) )
  }

  public update( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }
}
