import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { EmailNotFoundException } from 'src/package/shared/domain/exceptions/email-not-found-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

export class UserDaoFirebase implements UserDao {

  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'usersv2'

  async create( user: User,
    password: Password ): Promise<Result<string, Error>> {
    try {
      const path = await this.firebase.database.ref( this.collectionKey )
                             .push(
                               {
                                 id      : user.id.value,
                                 email   : user.email.value,
                                 password: password.value
                               }
                             )
      return Ok( 'user reg' )
    }
    catch ( e ) {
      return Err( new FirebaseOperationException() )
    }
  }

  async delete( email: Email ): Promise<Result<boolean, Error>> {
    const keySaved = await this.getKey( email )

    if ( keySaved.isErr() ) {
      return Err( keySaved.unwrapErr() )
    }

    let completed: string | null = null

    await this.firebase.database.ref( this.collectionKey )
              .child( keySaved.unwrap() )
              .remove(
                ( error ) => {
                  if ( !error ) {
                    completed = 'completed'
                  }
                }
              )

    if ( completed === null ) {
      return Err( new FirebaseOperationException( 'delete' ) )
    }

    return Ok( true )
  }

  async getAll(): Promise<Result<User[], Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async getByEmail( email: Email ): Promise<Result<User, Error[]>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'email' )
                     .equalTo( email.value )
                     .get()
                     .then( async ( snapshot ) => {
                       if ( snapshot.val() === null ) {
                         return Err( [ new EmailNotFoundException() ] )
                       }

                       const snapshotValue = Object.values(
                         snapshot.val() )[0] as Record<string, any>

                       const user = userFromJson( snapshotValue )

                       if ( user.isErr() ) {
                         return Err( user.unwrapErr() )
                       }

                       if ( email.value === user.unwrap().email.value ) {
                         return Ok( user.unwrap() )
                       }
                       return Err( [ new EmailNotFoundException() ] )
                     } )
                     .catch( ( error ) => {
                       return Err( [ new FirebaseOperationException() ] )
                     } )
  }

  private async getKey( email: Email ): Promise<Result<string, Error>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'email' )
                     .equalTo( email.value )
                     .get()
                     .then(
                       async ( snapshot ) => {

                         let key: string | null = null

                         snapshot.forEach( ( childSnapshot ) => {
                           key = childSnapshot.key
                         } )

                         if ( key === null ) {
                           return Err( new FirebaseOperationException( 'key' ) )
                         }
                         return Ok( key )
                       } )
  }

}
