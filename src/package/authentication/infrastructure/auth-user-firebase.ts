import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PasswordNotMatchException } from 'src/package/authentication/domain/exceptions/password-not-match-exception'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import {
  userFromJson,
  userToJson
} from 'src/package/user/application/user-mapper'
import { User } from 'src/package/user/domain/models/user'

export class AuthUserFirebase implements AuthUserRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'usersv2'

  /**
   * Logout user
   * @throws {UnknownException} - if unknown error
   */
  async logout( email: Email ): Promise<Result<boolean, Error>> {
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

  /**
   * Register  user
   * @throws {FirebaseOperationException} - if operation failed
   * @throws {UnknownException} - if unknown error
   */
  async registerUser( user: User,
    password: Password ): Promise<Result<string, Error[]>> {
    let completed: string | null = null

    const jsonResult = userToJson( user )

    if ( jsonResult.isErr() ) {
      return Err( jsonResult.unwrapErr() )
    }

    const json = jsonResult.unwrap()

    json['password'] = password.value

    await this.firebase.database.ref( this.collectionKey )
              .push( json,
                ( error ) => {
                  if ( error === null ) {
                    completed = 'completed'
                  }
                }
              )


    if ( completed === null ) {
      return Err( [ new FirebaseOperationException() ] )
    }

    return Ok( 'tk' )
  }

  /**
   * Reset password
   * @throws {FirebaseOperationException} - if operation failed
   */
  async sendResetPassword( email: Email ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

  /**
   * Delete user by email
   * @throws {FirebaseOperationException} - if operation failed
   */
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
