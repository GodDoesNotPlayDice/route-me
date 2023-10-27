import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	passengerFromJson,
	passengerToJson
} from 'src/package/passenger/application/passenger-mapper'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { EmailNotFoundException } from 'src/package/shared/domain/exceptions/email-not-found-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class PassengerDaoFirebase implements PassengerDao {

	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'passengersv2'

	/**
	 * Create passenger
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {UnknownException} - if unknown error
	 */
	async create( passenger: Passenger ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null
		const json                   = passengerToJson( passenger )

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
	 * Delete passenger by email
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
				                 if ( entry['preferences'] === null ) {
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
	 * Get passenger by email
	 * @throws {EmailInvalidException} - if email is invalid
	 * @throws {PassengerIdInvalidException} - if id is invalid
	 * @throws {PassengerNameInvalidException} - if name is invalid
	 * @throws {PassengerLastNameInvalidException} - if last name is invalid
	 * @throws {PassengerDescriptionInvalidException} - if description is invalid
	 * @throws {PhoneInvalidFormatException} - if phone format is invalid
	 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
	 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
	 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
	 * @throws {PassengerCountryInvalidException} - if country is invalid
	 * @throws {PreferenceIdInvalidException} - if preference id is invalid
	 * @throws {GenderInvalidException} - if gender is invalid
	 * @throws {ImageUrlInvalidException} - if image is invalid
	 * @throws {RatingIdInvalidException} - if id is invalid
	 * @throws {RatingValueInvalidException} - if value is invalid
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {EmailNotFoundException} - if email not found
	 */
	async getByEmail( email: Email ): Promise<Result<Passenger, Error[]>> {
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

			                 const passenger = passengerFromJson( snapshotValue )

			                 if ( passenger.isErr() ) {
				                 return Err( passenger.unwrapErr() )
			                 }

			                 if ( email.value === passenger.unwrap().email.value ) {
				                 return Ok( passenger.unwrap() )
			                 }
			                 return Err( [ new EmailNotFoundException() ] )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	/**
	 * Update a passenger
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {UnknownException} - if unknown error
	 */
	async update( passenger: Passenger ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( passenger.email )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}
		let completed: string | null = null

		const json = passengerToJson( passenger )
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

	/**
	 * Get firebase key by id
	 * @throws {FirebaseKeyNotFoundException} - if key operation failed
	 * @throws {FirebaseOperationException} - if operation failed
	 */
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
					                 return Err( new FirebaseKeyNotFoundException() )
				                 }
				                 return Ok( key )
			                 } )
		                 .catch( ( error ) => {
			                 return Err( new FirebaseOperationException() )
		                 } )
	}
}
