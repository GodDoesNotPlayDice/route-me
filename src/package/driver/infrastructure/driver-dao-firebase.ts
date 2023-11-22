import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Observable } from 'rxjs'
import {
	driverFromJson,
	driverToJson
} from 'src/package/driver/application/driver-mapper'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { DriverIdInvalidException } from 'src/package/driver/domain/exceptions/driver-id-invalid-exception'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class DriverDaoFirebase extends DriverDao {
	constructor( private firebase: AngularFireDatabase ) {
		super()
	}

	collectionKey = 'drivers'

	async listen( id: DriverID ): Promise<Result<Observable<Driver | null>, Error[]>> {
		try {
			const keySaved = await this.getKey( id )

			if ( keySaved.isErr() ) {
				return Err( [ keySaved.unwrapErr() ] )
			}

			const ref = this.firebase.database.ref(
				`${ this.collectionKey }/${ keySaved.unwrap() }` )

			ref.on( 'value', ( snapshot ) => {

				const value  = snapshot.val()
				const driver = driverFromJson( value )
				if ( driver.isOk() ) {
					this.driverChange.next( driver.unwrap() )
				}
			} )

			return Ok( this.driverChange.asObservable() )
		}
		catch ( e ) {
			return Err( [ new FirebaseOperationException() ] )
		}
	}

	async close( id: DriverID ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}

		this.firebase.database.ref(
			`${ this.collectionKey }/${ keySaved.unwrap() }` )
		    .off()

		this.driverChange.unsubscribe()
		return Ok( true )
	}

	/**
	 * Create a driver
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {UnknownException} - if unknown error
	 */
	async create( driver: Driver ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null
		const json                   = driverToJson( driver )

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
	 * Get a driver by id
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {EmailNotFoundException} - if email not found
	 */
	async getByEmail( email: Email ): Promise<Result<Driver, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'passenger/email' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new DriverIdInvalidException() ] )
			                 }

			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 const driver = driverFromJson( snapshotValue )

			                 if ( driver.isErr() ) {
				                 return Err( driver.unwrapErr() )
			                 }

			                 return Ok( driver.unwrap() )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	/**
	 * Update a driver
	 * @throws {UnknownException} - if unknown error
	 */
	async update( driver: Driver ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( driver.id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}
		let completed: string | null = null

		const json = driverToJson( driver )

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
	private async getKey( id: DriverID ): Promise<Result<string, Error>> {
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
