import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/passenger/domain/auth-passenger-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'

export class AuthPassengerLocalStorage implements AuthPassengerRepository {
  constructor( private storage: Storage ) {
    this.init()
  }

  async logout(id: UserID): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  private async init() {
    await this.storage.create()
  }

  public delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  public login( userID: UserID ): Promise<Result<Passenger, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  public register( passenger: Passenger ): Promise<Result<string, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  public update( passenger: Passenger ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( 'error' ) )
  }
}
