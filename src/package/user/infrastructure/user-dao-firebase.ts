import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { EmailNotFoundException } from 'src/package/shared/domain/exceptions/email-not-found-exception'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

export class UserDaoFirebase implements UserDao {

	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'usersv2'

	/**
	 * Get all users
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async getAll(): Promise<Result<User[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[] = []
			                 const users: User[]  = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const user = userFromJson(
					                 value as Record<string, any> )
				                 if ( user.isErr() ) {
					                 error.push( ...user.unwrapErr() )
					                 break
				                 }
				                 users.push( user.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( users )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	/**
	 * Get user by email
	 * @throws {EmailInvalidException} - if email is invalid
	 * @throws {UserIdInvalidException} - if id is invalid
	 */
	async getByEmail( email: Email ): Promise<Result<User, Error[]>> {
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

			                 const user = userFromJson( snapshotValue )

			                 if ( user.isErr() ) {
				                 return Err( user.unwrapErr() )
			                 }

			                 if ( email.value === user.unwrap().email.value ) {
				                 return Ok( user.unwrap() )
			                 }
			                 return Err( [ new EmailNotFoundException() ] )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
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
