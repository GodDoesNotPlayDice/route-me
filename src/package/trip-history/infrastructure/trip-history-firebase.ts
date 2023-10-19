import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import {
  tripHistoryFromJson,
  tripHistoryToJson
} from 'src/package/trip-history/application/trip-history-mapper'
import { TripHistoryDao } from 'src/package/trip-history/domain/dao/trip-history-dao'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'
import { TripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'

export class TripHistoryFirebase implements TripHistoryDao {
  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'triphistory'

  /**
   * Create trip history
   * @throws {FirebaseOperationException} - if operation failed
   */
  async create( trip: TripHistory ): Promise<Result<boolean, Error[]>> {
    let completed: string | null = null
    const json                   = tripHistoryToJson( trip )

    if ( json.isErr() ) {
      return Err( json.unwrapErr() )
    }
    await this.firebase.database.ref( this.collectionKey )
              .push( json,
                ( error ) => {
                  if ( !error ) {
                    completed = 'completed'
                  }
                }
              )
    if ( completed === null ) {
      return Err( [ new FirebaseOperationException() ] )
    }
    return Ok( true )
  }

  /**
   * Get all trip history
   * @throws {TripHistoryIdInvalidException} - if trip history id is invalid
   * @throws {UserIdInvalidException} - if user id is invalid
   * @throws {TripIdInvalidException} - if trip id is invalid
   * @throws {FirebaseOperationException} - if operation failed
   */
  async getAll(): Promise<Result<TripHistory[], Error[]>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .get()
                     .then( async ( snapshot ) => {
                       const error: Error[]               = []
                       const tripHistories: TripHistory[] = []
                       for ( let value of Object.values( snapshot.val() ) ) {
                         const tripHistory = tripHistoryFromJson(
                           value as Record<string, any> )
                         if ( tripHistory.isErr() ) {
                           error.push( ...tripHistory.unwrapErr() )
                           break
                         }
                         tripHistories.push( tripHistory.unwrap() )
                       }
                       if ( error.length > 0 ) {
                         return Err( error )
                       }
                       return Ok( tripHistories )
                     } )
                     .catch( ( error ) => {
                       return Err( [ new FirebaseOperationException() ] )
                     } )
  }

  /**
   * Get by id trip history
   * @throws {FirebaseOperationException} - if operation failed
   * @throws {UserIdInvalidException} - if user id is invalid
   * @throws {TripIdInvalidException} - if trip id is invalid
   * @throws {FirebaseOperationException} - if operation failed
   */
  async getById( id: TripHistoryID ): Promise<Result<TripHistory, Error[]>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'id' )
                     .equalTo( id.value )
                     .get()
                     .then( async ( snapshot ) => {
                       const snapshotValue = Object.values(
                         snapshot.val() )[0] as Record<string, any>
                       const tripHistory   = tripHistoryFromJson(
                         snapshotValue )

                       if ( tripHistory.isErr() ) {

                         return Err( tripHistory.unwrapErr() )
                       }
                       return Ok( tripHistory.unwrap() )
                     } )
                     .catch( ( error ) => {
                       return Err( [ new FirebaseOperationException() ] )
                     } )
  }

  /**
   * Get firebase key by id
   * @throws {FirebaseKeyNotFoundException} - if key not found
   */
  private async getKey( id: TripHistoryID ): Promise<Result<string, Error>> {
    return await this.firebase.database.ref( this.collectionKey )
                     .orderByChild( 'id' )
                     .equalTo( id.value )
                     .get()
                     .then(
                       async ( snapshot ) => {
                         let key: string | null = null

                         snapshot.forEach( ( childSnapshot ) => {
                           key = childSnapshot.key
                         } )
                         if ( key === null ) {
                           return Err( new FirebaseKeyNotFoundException() )
                         }
                         return Ok( key )
                       } )
  }
}
