import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	passengerTripFromJSON,
	passengerTripToJSON
} from 'src/package/passenger-trip/application/passenger-trip-mapper'
import { PassengerTripDao } from 'src/package/passenger-trip/domain/dao/passenger-trip-dao'
import { TripStateNotMatchException } from 'src/package/passenger-trip/domain/exceptions/trip-state-not-match-exception'
import { PassengerTrip } from 'src/package/passenger-trip/domain/models/passenger-trip'
import { EmailNotFoundException } from 'src/package/shared/domain/exceptions/email-not-found-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export class PassengerTripDaoFirebase implements PassengerTripDao {

	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'passengertrip'

	async create( passengerTrip: PassengerTrip ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const json = passengerTripToJSON( passengerTrip )

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

	async getByEmailAndID( id: TripID,
		email: Email ): Promise<Result<PassengerTrip, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'trip_id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const json = value as Record<string, any>
				                 if ( json['user_email'] === email.value ) {
					                 const passengerTrip = passengerTripFromJSON( json )
					                 if ( passengerTrip.isErr() ) {
						                 error.push( ...passengerTrip.unwrapErr() )
						                 break
					                 }
					                 return Ok( passengerTrip.unwrap() )
				                 }
			                 }
			                 error.push( new EmailNotFoundException() )
			                 return Err( error )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )

	}

	async getByID( id: TripID ): Promise<Result<PassengerTrip[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'trip_id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[]       = []
			                 const psn: PassengerTrip[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const psnResult = passengerTripFromJSON(
					                 value as Record<string, any> )
				                 if ( psnResult.isErr() ) {
					                 error.push( ...psnResult.unwrapErr() )
					                 break
				                 }
				                 psn.push( psnResult.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( psn )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	async delete( id: TripID, email: Email ): Promise<Result<boolean, Error>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'trip_id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( new EmailNotFoundException() )
			                 }

			                 let completed: string | null = null

			                 snapshot.forEach( ( childSnapshot ) => {
				                 if ( childSnapshot.val()['user_email'] ===
					                 email.value )
				                 {
					                 childSnapshot.ref.remove( err => {
						                 completed = !err ? 'completed' : null
					                 } )
				                 }
			                 } )

			                 if ( completed === null ) {
				                 return Err(
					                 new FirebaseOperationException( 'remove failed' ) )
			                 }
			                 return Ok( true )
		                 } )
		                 .catch( ( error ) => {
											 console.log('err')
											 console.log(error)
			                 return Err( new FirebaseOperationException() )
		                 } )
	}

	async getAllByEmail( email: Email ): Promise<Result<PassengerTrip[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'user_email' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 console.log( snapshot.val() )
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new EmailNotFoundException() ] )
			                 }
			                 const error: Error[]                  = []
			                 const passengerTrips: PassengerTrip[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const passengerTrip = passengerTripFromJSON(
					                 value as Record<string, any> )
				                 if ( passengerTrip.isErr() ) {
					                 error.push( ...passengerTrip.unwrapErr() )
					                 break
				                 }
				                 passengerTrips.push( passengerTrip.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( passengerTrips )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	async update( passengerTrip: PassengerTrip ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( passengerTrip.tripID )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}
		let completed: string | null = null

		const json = passengerTripToJSON( passengerTrip )

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

	async deleteAll( email: Email,
		state: TripState ): Promise<Result<boolean, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'user_email' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new EmailNotFoundException() ] )
			                 }

			                 const error: Error[]         = []
			                 let completed: string | null = null
			                 let stateNotMatch            = true

			                 snapshot.forEach( ( childSnapshot ) => {
								 console.log('-----entry----')
								 console.log(childSnapshot.val()['state'])
								 console.log(state)
				                 if ( childSnapshot.val()['state'] === state ) {
					                 stateNotMatch = false
					                 childSnapshot.ref.remove(
						                 err => {
							                 completed = !err ? 'completed' : null
						                 }
					                 )
				                 }
			                 } )

			                 if ( completed === null ) {
				                 error.push(
					                 new FirebaseOperationException( 'remove failed' ) )
			                 }
			                 if ( stateNotMatch ) {
				                 error.push( new TripStateNotMatchException() )
			                 }

			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }

			                 return Ok( true )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	private async getKey( id: TripID ): Promise<Result<string, Error>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'trip_id' )
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
