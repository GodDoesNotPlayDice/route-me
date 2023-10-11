import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthDriverRepository } from 'src/package/authentication/driver/domain/auth-driver-repository'
import { Driver } from 'src/package/driver/domain/models/driver'
import { UserID } from 'src/package/user/domain/models/user-id'

export class AuthDriverFirebase implements AuthDriverRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  async logout(id: UserID): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }


  async login( userID: UserID ): Promise<Result<Driver, string>> {
    return Promise.resolve( Err('e') )
  }

  async register( driver: Driver ): Promise<Result<string, string>> {
    return Promise.resolve( Err('e') )
  }

  async update( driver: Driver ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }
}
