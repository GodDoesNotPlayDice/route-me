import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import {
	userFromJson,
	userToJson
} from 'src/package/user/application/user-mapper'
import { User } from 'src/package/user/domain/models/user'

export class AuthUserFirebaseSignin implements AuthUserRepository {
	constructor( private auth: AngularFireAuth,
		private firebase: AngularFireDatabase )
	{
	}

	collectionKey = 'users'

	/**
	 * Logout user
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async logout( email: Email ): Promise<Result<boolean, Error>> {
		try {
			await this.auth.signOut()
			return Ok( true )
		}
		catch ( e ) {
			return Err( new FirebaseOperationException() )
		}
	}

	/**
	 * Login user
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async login( email: Email,
		password: Password ): Promise<Result<User, Error[]>> {
		try {
			const cred = await this.auth.signInWithEmailAndPassword( email.value,
				password.value )

			const errors: Error[] = []
			return await this.firebase.database.ref( this.collectionKey )
			                 .orderByChild( 'email' )
			                 .equalTo( email.value )
			                 .get()
			                 .then( async ( snapshot ) => {
				                 const snapshotValue = Object.values(
					                 snapshot.val() )[0] as Record<string, any>

				                 const user = userFromJson( snapshotValue )

				                 if ( user.isErr() ) {
					                 errors.push( ...user.unwrapErr() )
				                 }

				                 if ( errors.length > 0 ) {
					                 return Err( errors )
				                 }

				                 return Ok( user.unwrap() )
			                 } )
			                 .catch( ( e ) => {
				                 errors.push(
					                 new FirebaseOperationException( 'login firebase' ) )
				                 return Err( errors )
			                 } )
		}
		catch ( e ) {
			return Err( [ new FirebaseOperationException() ] )
		}
	}

	/**
	 * Register user
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async registerUser( user: User,
		password: Password ): Promise<Result<string, Error[]>> {
		try {
			await this.auth.createUserWithEmailAndPassword(
				user.email.value, password.value )

			let completed: string | null = null

			const jsonResult = userToJson( user )

			if ( jsonResult.isErr() ) {
				return Err( jsonResult.unwrapErr() )
			}

			const json = jsonResult.unwrap()

			json['password'] = password.value
			json['provider'] = 'firebase'

			await this.firebase.database.ref( this.collectionKey )
			          .push( json,
				          ( error ) => {
					          if ( error === null ) {
						          completed = 'completed'
					          }
				          }
			          )


			if ( completed === null ) {
				return Err( [ new FirebaseOperationException() ] )
			}

			return Ok( 'tk' )
		}
		catch ( e ) {
			console.log( 'signin errr' )
			console.log( e )
			return Err( [ new FirebaseOperationException() ] )
		}
	}

	/**
	 * Reset password
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async sendResetPassword( email: Email ): Promise<Result<boolean, Error>> {
		try {
			await this.auth.sendPasswordResetEmail( email.value )
			return Ok( true )
		}
		catch ( e ) {
			return Err( new FirebaseOperationException() )
		}
	}

	/**
	 * Delete user
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
