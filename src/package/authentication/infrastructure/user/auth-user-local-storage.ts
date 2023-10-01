import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export class AuthUserLocalStorage implements AuthUserRepository {
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
    password: UserPassword ): Promise<Result<string, string>> {
    return Promise.resolve( Ok( 'id' ) )
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async update( user: User ): Promise<Result<User, string>> {
    return Promise.resolve( Err( 'error' ) )
  }
}
