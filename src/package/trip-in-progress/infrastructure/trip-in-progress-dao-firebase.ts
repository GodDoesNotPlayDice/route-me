import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Observable } from 'rxjs'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgressInvalidException } from 'src/package/trip-in-progress/domain/exceptions/trip-in-progress-invalid-exception'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import {
	tripInProgressFromJSON,
	tripInProgressToJSON
} from '../application/trip-in-progress-mapper'

export class TripInProgressDaoFirebase extends TripInProgressDao {
	constructor( private firebase: AngularFireDatabase ) {
		super()
	}

	collectionKey = 'tripsinprogress'

	async listen( id: TripID ): Promise<Result<Observable<TripInProgress | null>, Error[]>> {
		try {
			const keySaved = await this.getKey( id )

			if ( keySaved.isErr() ) {
				return Err( [ keySaved.unwrapErr() ] )
			}

			const ref = this.firebase.database.ref(
				`${ this.collectionKey }/${ keySaved.unwrap() }` )

			ref.on( 'value', ( snapshot ) => {

				const value = snapshot.val()
				const trip  = tripInProgressFromJSON( value )
				if ( trip.isOk() ) {
					this.tripChange.next( trip.unwrap() )
				}
			} )

			return Ok( this.tripChange.asObservable() )
		}
		catch ( e ) {
			return Err( [ new FirebaseOperationException() ] )
		}
	}

	async close( id: TripID ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}

		this.tripChange.unsubscribe()
		this.firebase.database.ref(
			`${ this.collectionKey }/${ keySaved.unwrap() }` )
		    .off()
		return Ok( true )
	}

	async getByID( trip: TripID ): Promise<Result<TripInProgress, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'id' )
		                 .equalTo( trip.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new TripInProgressInvalidException() ] )
			                 }

			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 const trip = tripInProgressFromJSON( snapshotValue )

			                 if ( trip.isErr() ) {
				                 return Err( trip.unwrapErr() )
			                 }

			                 return Ok( trip.unwrap() )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

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
				          if ( !error ) {
					          completed = 'completed'
				          }
			          } )
		if ( completed === null ) {
			return Err( [ new FirebaseOperationException() ] )
		}
		return Ok( true )
	}

	async delete( id: TripID ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
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
			return Err( [ new FirebaseOperationException( 'delete' ) ] )
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
				return Err(
					[ ...updateResult.unwrapErr(), ...createResult.unwrapErr() ] )
			}
			else {
				return Ok( createResult.unwrap() )
			}
		}
		else {
			return Ok( updateResult.unwrap() )
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
