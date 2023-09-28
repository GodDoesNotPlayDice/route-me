import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { userFromJson } from 'src/package/user/application'
import {
  User,
  UserDao,
  UserID
} from 'src/package/user/domain'

export class UserDaoFirebase implements UserDao {
  constructor( private firebase: AngularFireDatabase ) {
  }

  public getAll(): Promise<Result<User[], string>> {
    console.log( 'firebaseinit' )
    console.log( this.firebase.database.ref( 'users' ) )
    this.firebase.database.ref( 'users' )
        .get()
        .then( ( snapshot ) => {
          for ( const snapshotElement of Object.values( snapshot.val() ) ) {
            const s = userFromJson(
              snapshotElement as Record<string, any> )
            if ( s.isNone() ) {
              console.log( 'none' )
              continue
            }
            console.log( s.unwrap() )
          }
        } )
    console.log( 'firebaseend' )

    return Promise.resolve( Ok( [] ) )
    // return Promise.resolve( Err("err") )
  }

  public getById( id: UserID ): Promise<Result<User, string>> {
    return Promise.resolve( Err('') )
  }
}
