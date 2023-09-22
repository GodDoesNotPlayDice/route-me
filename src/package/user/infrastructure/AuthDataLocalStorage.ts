import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  AuthRepository,
  User,
  UserEmail,
  UserPassword
} from 'src/package/user/domain'

export class AuthDataLocalStorage implements AuthRepository {
  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
    await this.storage.set( 'name', 'Mr. Ionitron' )
    const name = await this.storage.get( 'name' )
    console.log( 'name' )
    console.log( name )
  }

  getAll(): Promise<Result<User[], string>> {
    console.log( 'init' )
    console.log( 'end' )
    return Promise.resolve( Ok( [] ) )
    // return Promise.resolve( Err("err") )
  }


  login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    return Promise.resolve( Err( 'data error' ) )
  }

  register( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }
}
