import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PasswordNotMatchException } from 'src/package/authentication/domain/exceptions/password-not-match-exception'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { EmailNotFoundException } from 'src/package/shared/domain/exceptions/email-not-found-exception'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

export class AuthUserFirebase implements AuthUserRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'usersv2'

  /**
   * Logout user
   * @throws {UnknownException} - if unknown error
   */
  async logout( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'logout firebase' ) )
  }

  /**
   * Login user
   * @throws {EmailNotFoundException} - if email not found
   * @throws {PasswordNotMatchException} - if password not match
   */
  async login( email: Email,
    password: Password ): Promise<Result<User, Error[]>> {
    const errors: Error[] = []
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'email' )
                     .equalTo( email.value )
                     .get()
                     .then( async ( snapshot ) => {
                       const snapshotValue = Object.values(
                         snapshot.val() )[0] as Record<string, any>

                       if ( snapshotValue['password'] !== password.value ) {
                         errors.push(
                           new PasswordNotMatchException( 'firebase' ) )
                         return Err( errors )
                       }

                       const user = userFromJson( snapshotValue )

                       if ( user.isErr() ) {
                         errors.push( ...user.unwrapErr() )
                       }

                       if ( errors.length > 0 ) {
                         return Err( errors )
                       }

                       return Ok( user.unwrap() )
                     } )
                     .catch( ( e ) => {
                       errors.push(
                         new FirebaseOperationException( 'login firebase' ) )
                       return Err( errors )
                     } )
  }
}
