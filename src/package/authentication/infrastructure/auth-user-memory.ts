import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserNotFoundException } from 'src/package/user/domain/exceptions/user-not-found-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export class AuthUserMemory implements AuthUserRepository {
	constructor( private context: User[] ) {}

	/**
	 * Logout user
	 * @throws {UnknownException} - if unknown error
	 */
	async logout( id: UserID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException( 'logout memory' ) )
	}

	/**
	 * Login user
	 * @throws {UserNotFoundException} - if user not found
	 */
	async login( email: UserEmail,
		password: UserPassword ): Promise<Result<User, Error[]>> {
		for ( const user of this.context ) {
			if ( user.email.value === email.value )
			{
				return Ok( user )
			}
		}
		const errors: Error[] = []
		errors.push(new UserNotFoundException( 'login memory' ))
		return Err( errors )
	}

	/**
	 * Register user
	 * @throws {UnknownException} - if unknown error
	 */
	async register( user: User,
		password: UserPassword ): Promise<Result<string, Error>> {
		try {
			this.context.push( user )
			return Ok( 'id' )
		}
		catch ( e ) {
			return Err( new UnknownException( 'register memory' ) )
		}
	}

	/**
	 * Delete user
	 * @throws {UnknownException} - if unknown error
	 */
	async delete( id: UserID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException( 'delete memory' ) )
	}

	/**
	 * Update user
	 * @throws {UnknownException} - if unknown error
	 */
	async update( user: User ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException( 'update memory' ) )
	}
}
