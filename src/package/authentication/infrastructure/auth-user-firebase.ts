import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PasswordNotMatchException } from 'src/package/authentication/domain/exceptions/password-not-match-exception'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { UserEmailNotFoundException } from 'src/package/user/domain/exceptions/user-email-not-found-exception'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export class AuthUserFirebase implements AuthUserRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'users'

  /**
   * Logout user
   * @throws {UnknownException} - if unknown error
   */
  async logout( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'logout firebase' ) )
  }

  /**
   * Delete user
   * @throws {FirebaseOperationException} - if operation failed
   */
  async delete( email : UserEmail ): Promise<Result<boolean, Error>> {
    const keySaved = await this.getKey( email)

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
      return Err( new FirebaseOperationException('delete') )
    }

    return Ok( true )
  }

  /**
   * Update user
   * @throws {UnknownException} - if unknown error
   */
  async update( user: User ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException( 'update firebase' ) )
  }

  /**
   * Login user
   * @throws {UserNotFoundException} - if user not found
   * @throws {PasswordNotMatchException} - if password not match
   */
  async login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, Error[]>> {
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
                         new UserNotFoundException( 'login firebase' ) )
                       return Err( errors )
                     } )
  }

  /**
   * Register user
   * @throws {UnknownException} - if unknown error
   */
  async register( user: User,
    password: UserPassword ): Promise<Result<string, Error>> {
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
      return Err( new UnknownException( 'register firebase' ) )
    }
  }

  /**
   * Get user by email
   * @throws {UserEmailNotFoundException} - if user email not found
   * @throws {FirebaseOperationException} - if operation failed
   * @throws {EmailInvalidException} - if email is invalid
   * @throws {UserIdInvalidException} - if id is invalid
   */
  async getByEmail( email: UserEmail ): Promise<Result<boolean, Error[]>> {
    // return Err( new UserEmailNotFoundException( 'firebase' ) )
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'email' )
                     .equalTo( email.value )
                     .get()
                     .then( async ( snapshot ) => {
                       if ( snapshot.val() === null ) {
                         return Err( [new UserEmailNotFoundException()] )
                       }

                       const snapshotValue = Object.values(
                         snapshot.val() )[0] as Record<string, any>

                       const user = userFromJson( snapshotValue )

                       if ( user.isErr() ) {
                         return Err( user.unwrapErr() )
                       }

                       if ( email.value === user.unwrap().email.value ) {
                         return Ok( true )
                       }
                       return Err( [new UserEmailNotFoundException()] )
                     } )
                     .catch( ( error ) => {
                       return Err( [new FirebaseOperationException()] )
                     } )
  }

  private async getKey( email: UserEmail ): Promise<Result<string, Error>> {
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
                           return Err( new FirebaseOperationException('key') )
                         }
                         return Ok( key )
                       } )
  }
}
