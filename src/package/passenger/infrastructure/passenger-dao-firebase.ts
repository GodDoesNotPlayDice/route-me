import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { passengerFromJson } from 'src/package/passenger/application/passenger-mapper'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { UserID } from 'src/package/user/domain/models/user-id'

export class PassengerDaoFirebase implements PassengerDao {
  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'passengers'

  /**
   * Get all passengers
   * @throws {FirebaseOperationException} - if operation failed
   */
  async getAll(): Promise<Result<Passenger[], Error[]>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .get()
                     .then( async ( snapshot ) => {
                       const error: Error[]          = []
                       const passengers: Passenger[] = []
                       for ( let value of Object.values( snapshot.val() ) ) {
                         const entry = value as Record<string, any>
                         if ( entry['preferences'] === 'none' ) {
                           entry['preferences'] = []
                         }
                         const passenger = passengerFromJson(
                           value as Record<string, any> )
                         if ( passenger.isErr() ) {
                           error.push( ...passenger.unwrapErr() )
                           break
                         }
                         passengers.push( passenger.unwrap() )
                       }
                       if ( error.length > 0 ) {
                         return Err( error )
                       }
                       return Ok( passengers )
                     } )
                     .catch( ( error ) => {
                       return Err( [ new FirebaseOperationException() ] )
                     } )
  }

  /**
   * Get passenger by id
   * @throws {FirebaseOperationException} - if operation failed
   */
  async getById( id: UserID ): Promise<Result<Passenger, Error[]>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'userID' )
                     .equalTo( id.value )
                     .get()
                     .then( async ( snapshot ) => {
                       const snapshotValue = Object.values(
                         snapshot.val() )[0] as Record<string, any>

                       if ( snapshotValue['preferences'] === 'none' ) {
                         snapshotValue['preferences'] = []
                       }
                       const passenger = passengerFromJson( snapshotValue )

                       if ( passenger.isErr() ) {
                         return Err( passenger.unwrapErr() )
                       }
                       return Ok( passenger.unwrap() )
                     } )
                     .catch( ( error ) => {
                       return Err( [ new FirebaseOperationException() ] )
                     } )
  }

  /**
   * Delete a passenger
   * @throws {FirebaseOperationException} - if operation failed
   */
  async delete( id: UserID ): Promise<Result<boolean, Error>> {
    const keySaved = await this.getKey( id )

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
      return Err( new FirebaseOperationException() )
    }

    return Ok( true )
  }

  /**
   * Create a passenger
   * @throws {FirebaseOperationException} - if operation failed
   */
  async create( passenger: Passenger ): Promise<Result<Passenger, Error>> {
    let completed: string | null = null
    await this.firebase.database.ref( this.collectionKey )
              .push(
                {
                  id         : passenger.id.value,
                  userID     : passenger.userID.value,
                  name       : passenger.name.value,
                  lastName   : passenger.lastName.value,
                  description: passenger.description.value,
                  phone      : passenger.phone.value,
                  birthDay   : passenger.birthDay.value.toJSON(),
                  country    : passenger.country.value,
                  gender     : passenger.gender,
                  preferences: 'none'
                },
                ( error ) => {
                  if ( !error ) {
                    completed = 'completed'
                  }
                }
              )

    if ( completed === null ) {
      return Err( new FirebaseOperationException() )
    }

    return Ok( passenger )
  }

  /**
   * Update a passenger
   * @throws {FirebaseOperationException} - if operation failed
   */
  async update( passenger: Passenger ): Promise<Result<boolean, Error>> {
    const keySaved = await this.getKey( passenger.userID )

    if ( keySaved.isErr() ) {
      return Err( keySaved.unwrapErr() )
    }
    let completed: string | null = null

    await this.firebase.database.ref( this.collectionKey )
              .child( keySaved.unwrap() )
              .set( {
                  id         : passenger.id.value,
                  userID     : passenger.userID.value,
                  name       : passenger.name.value,
                  lastName   : passenger.lastName.value,
                  description: passenger.description.value,
                  phone      : passenger.phone.value,
                  birthDay   : passenger.birthDay.value,
                  country    : passenger.country.value,
                  gender     : passenger.gender,
                  preferences: passenger.preferences.map( ( preference ) => {
                    return {
                      id: preference.value
                    }
                  } )
                },
                ( error ) => {
                  if ( !error ) {
                    completed = 'completed'
                  }
                } )
    if ( completed === null ) {
      return Err( new FirebaseOperationException() )
    }
    return Ok( true )
  }

  /**
   * Get firebase key by id
   * @throws {FirebaseOperationException} - if operation failed
   */
  private async getKey( id: UserID ): Promise<Result<string, Error>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'userID' )
                     .equalTo( id.value )
                     .get()
                     .then(
                       async ( snapshot ) => {

                         let key: string | null = null

                         snapshot.forEach( ( childSnapshot ) => {
                           key = childSnapshot.key
                         } )

                         if ( key === null ) {
                           return Err( new FirebaseOperationException() )
                         }
                         return Ok( key )
                       } )
  }
}
