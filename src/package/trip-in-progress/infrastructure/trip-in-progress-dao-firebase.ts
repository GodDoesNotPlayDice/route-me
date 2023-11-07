import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { tripInProgressToJSON } from '../application/trip-in-progress-mapper'

export class TripInProgressDaoFirebase implements TripInProgressDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'tripsinprogress'

	async update( trip: TripInProgress ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( trip.id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}
		let completed: string | null = null

		const json = tripInProgressToJSON( trip )

		if ( json.isErr() ) {
			return Err( json.unwrapErr() )
		}

		await this.firebase.database.ref( this.collectionKey )
		          .child( keySaved.unwrap() )
		          .set( json.unwrap(),
			          ( error ) => {
				          console.log( 'possible error' )
				          console.log( error )
				          if ( !error ) {
					          completed = 'completed'
				          }
			          } )
		if ( completed === null ) {
			return Err( [ new FirebaseOperationException() ] )
		}
		return Ok( true )
	}

	async create( trip: TripInProgress ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null
		const json                   = tripInProgressToJSON( trip )

		if ( json.isErr() ) {
			return Err( json.unwrapErr() )
		}

		await this.firebase.database.ref( this.collectionKey )
		          .push( json.unwrap(),
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

	async upsert( trip: TripInProgress ): Promise<Result<boolean, Error[]>> {
		const updateResult = await this.update( trip )

		if ( updateResult.isErr() ) {
			const createResult = await this.create( trip )

			if ( createResult.isErr() ) {
				return Err( [ ...updateResult.unwrapErr(), ...createResult.unwrapErr() ] )
			}
			else{
				return Ok( createResult.unwrap() )
			}
		}
		else {
			return Ok(updateResult.unwrap())
		}
	}

	private async getKey( id: TripID ): Promise<Result<string, Error>> {
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
		                 .catch( ( error ) => {
			                 return Err( new FirebaseOperationException() )
		                 } )
	}
}
