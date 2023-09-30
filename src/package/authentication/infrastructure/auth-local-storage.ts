import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import {
  User,
  UserEmail,
  UserID,
  UserPassword
} from 'src/package/user'

export class AuthLocalStorage implements AuthRepository {
  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
  }

  login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    return Promise.resolve( Err( 'data error' ) )
  }

  async register( email: UserEmail,
    password: UserPassword ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async create( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async update( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }
}
