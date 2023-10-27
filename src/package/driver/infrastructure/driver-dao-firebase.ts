import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	driverFromJson,
	driverToJson
} from 'src/package/driver/application/driver-mapper'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { EmailNotFoundException } from 'src/package/shared/domain/exceptions/email-not-found-exception'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class DriverDaoFirebase implements DriverDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'drivers'

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
	 * Delete a driver
	 * @throws {UnknownException} - if unknown error
	 */
	async delete( id: DriverID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

	/**
	 * Get all drivers
	 * @throws {UnknownException} - if unknown error
	 */
	async getAll(): Promise<Result<Driver[], Error[]>> {
		return Err( [ new UnknownException() ] )
	}

	/**
	 * Get a driver by id
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {EmailNotFoundException} - if email not found
	 */
	async getByEmail( email: Email ): Promise<Result<Driver, Error[]>> {
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
	async update( driver: Driver ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

}
