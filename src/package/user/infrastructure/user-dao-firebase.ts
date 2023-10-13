import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/repository/user-dao'

export class UserDaoFirebase implements UserDao {
  constructor( private firebase: AngularFireDatabase ) {
  }

  /**
   * Get all users
   * @throws {UserNotFoundException} - if users not found
   */
  async getAll(): Promise<Result<User[], Error>> {
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

    return Err(new UserNotFoundException('firebase'))
  }

  /**
   * Get user by id
   * @throws {UserNotFoundException} - if user not found
   */
  async getById( id: UserID ): Promise<Result<User, Error>> {
    return Err(new UserNotFoundException('firebase'))
  }
}
