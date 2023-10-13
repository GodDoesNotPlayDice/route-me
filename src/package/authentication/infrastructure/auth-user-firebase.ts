import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { PasswordNotMatchException } from 'src/package/authentication/domain/exceptions/password-not-match-exception'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { userFromJson } from 'src/package/user/application/user-mapper'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export class AuthUserFirebase implements AuthUserRepository {
	constructor( private firebase: AngularFireDatabase ) {
	}

	/**
	 * Logout user
	 * @throws {UnknownException} - if unknown error
	 */
	async logout( id: UserID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException( 'logout firebase' ) )
	}

	/**
	 * Delete user
	 * @throws {UnknownException} - if unknown error
	 */
	async delete( id: UserID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException( 'delete firebase' ) )

	}

	/**
	 * Update user
	 * @throws {UnknownException} - if unknown error
	 */
	async update( user: User ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException( 'update firebase' ) )
	}

	/**
	 * Login user
	 * @throws {UserNotFoundException} - if user not found
	 * @throws {PasswordNotMatchException} - if password not match
	 */
	async login( email: UserEmail,
		password: UserPassword ): Promise<Result<User, Error[]>> {
		const errors: Error[] = []
		return await this.firebase.database.ref( 'users' )
		                 .orderByChild( 'email' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 if ( snapshotValue['password'] !== password.value ) {
				                 errors.push( new PasswordNotMatchException('firebase') )
				                 return Err( errors )
			                 }

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
			                 errors.push( new UserNotFoundException( 'login firebase' ) )
			                 return Err( errors )
		                 } )
	}

	/**
	 * Register user
	 * @throws {UnknownException} - if unknown error
	 */
	async register( user: User,
		password: UserPassword ): Promise<Result<string, Error>> {
		try {
			const path = await this.firebase.database.ref( 'users' )
			                       .push(
				                       {
					                       id      : user.id.value,
					                       email   : user.email.value,
					                       password: password.value
				                       }
			                       )
			return Ok( 'user reg' )
		}
		catch ( e ) {
			return Err( new UnknownException( 'register firebase' ) )
		}
	}
}
