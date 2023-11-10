import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import {
	tripFromJSON,
	tripToJSON
} from 'src/package/trip/application/trip-mapper'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripNotFoundException } from 'src/package/trip/domain/exceptions/trip-not-found-exception'
import { TripNotMatchStateException } from 'src/package/trip/domain/exceptions/trip-not-match-state-exception'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export class TripDaoFirebase implements TripDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'trips'

	/**
	 * Create trip
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {UnknownException} - if unknown error
	 */
	async create( trip: Trip ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const json = tripToJSON( trip )

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

	/**
	 * Delete trip by id
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async delete( id: TripID ): Promise<Result<boolean, Error>> {
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
			return Err( new FirebaseOperationException( 'delete' ) )
		}

		return Ok( true )
	}

	/**
	 * Get all trips
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async getAll(): Promise<Result<Trip[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[] = []
			                 const trips: Trip[]  = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const trip = tripFromJSON(
					                 value as Record<string, any> )
				                 if ( trip.isErr() ) {
					                 error.push( ...trip.unwrapErr() )
					                 break
				                 }
				                 trips.push( trip.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( trips )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	/**
	 * Get trip by state
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async getAllByState( state: TripState ): Promise<Result<Trip[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'state' )
		                 .equalTo( state )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new TripNotMatchStateException() ] )
			                 }
			                 const error: Error[] = []
			                 const trips: Trip[]  = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const trip = tripFromJSON(
					                 value as Record<string, any> )
				                 if ( trip.isErr() ) {
					                 error.push( ...trip.unwrapErr() )
					                 break
				                 }
				                 trips.push( trip.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( trips )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	/**
	 * Get trip by id
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {TripNotFoundException} - if trip not found
	 */
	async getById( id: TripID ): Promise<Result<Trip, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new TripNotFoundException() ] )
			                 }

			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 const passenger = tripFromJSON( snapshotValue )

			                 if ( passenger.isErr() ) {
				                 return Err( passenger.unwrapErr() )
			                 }

			                 return Ok( passenger.unwrap() )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	async update( trip: Trip ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( trip.id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}
		let completed: string | null = null

		const json = tripToJSON( trip )

		if ( json.isErr() ) {
			return Err( json.unwrapErr() )
		}

		await this.firebase.database.ref(
			`${ this.collectionKey }/${ keySaved.unwrap() }` )
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

	/**
	 * Get firebase key by id
	 * @throws {FirebaseKeyNotFoundException} - if key operation failed
	 * @throws {FirebaseOperationException} - if operation failed
	 */
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
