import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Option,
  Result
} from 'oxide.ts'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/repository/user-dao'

export class UserDaoFirebase implements UserDao {
  constructor( private firebase: AngularFireDatabase ) {
  }

  public getAll(): Promise<Result<User[], string>> {
    console.log( 'firebaseinit' )

    // this.firebase.database.ref( 'users/abc' )
    //     .get()
    //     .then( ( snapshot ) => {
    //         const s = userFromJson( snapshot.val() as Record<string, any> )
    //         if ( s.isNone() ) {
    //           console.log( 'none' )
    //           return
    //         }
    //         console.log( s.unwrap() )
    //     } )

            // for ( const snapshotElement of Object.values( snapshot.val() ) ) {
            //   console.log('snapshotElement', snapshotElement)
            //   const s = userFromJson(
            //     snapshotElement as Record<string, any> )
            //   if ( s.isNone() ) {
            //     console.log( 'none' )
            //     continue
            //   }
            //   console.log( s.unwrap() )
            // }
    console.log( 'firebaseend' )

    return Promise.resolve( Ok( [] ) )
    // return Promise.resolve( Err("err") )
  }

  public getById( id: UserID ): Promise<Result<User, string>> {
    return Promise.resolve( Err('') )
  }
}
