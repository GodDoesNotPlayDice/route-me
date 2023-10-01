import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

//TODO: se podria pasar a funcional
export class AuthUserFirebase implements AuthUserRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async update( user: User ): Promise<Result<User, string>> {
    return Promise.resolve( Err( 'error' ) )
  }

  async login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    return await this.firebase.database.ref( 'users' )
     .orderByChild( 'email' )
     .equalTo( email.value )
     .get()
     .then( async ( snapshot ) => {
       const snapshotValue = Object.values(
         snapshot.val() )[0] as Record<string, any>
       const user = userFromJson( snapshotValue)
       if ( user.isNone() ) {
         console.log( 'none')
         return Promise.resolve( Err( 'user not found' ) )
       }

       if ( snapshotValue['password'] !== password.value ) {
         console.log( 'password not match' )
         return Promise.resolve( Err( 'password not match' ) )
       }

       return Promise.resolve( Ok( user.unwrap() ) )
     } )
  }

  async register( email: UserEmail,
    password: UserPassword ): Promise<Result<string, string>> {
    return Promise.resolve( Ok( 'id' ) )
  }
}
