import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { newUser } from 'src/package/user/domain/models/user'
import { newUserPassword } from 'src/package/user/domain/models/user-password'
import { ulid } from 'ulidx'

/**
 * Register user
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PasswordInsufficientLengthException} - if password length is invalid
 * @throws {PasswordInsufficientUppercaseException} - if password uppercase is invalid
 * @throws {PasswordInsufficientLowercaseException} - if password lowercase is invalid
 * @throws {PasswordInsufficientNumberException} - if password number is invalid
 * @throws {PasswordInsufficientCharacterException} - if password character is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 * @throws {UnknownException} - if unknown error
 */
export const registerUser = async ( repository: AuthUserRepository,
	email: string,
	password: string
): Promise<Result<string, Error[]>> => {
	const error: Error[] = []

	const userResult = newUser( {
		id   : ulid(),
		email: email
	} )

	if ( userResult.isErr() ) {
		error.push( ...userResult.unwrapErr() )
	}

	const passwordResult = newUserPassword( {
		value: password
	} )

	if ( passwordResult.isErr() ) {
		error.push( ...passwordResult.unwrapErr() )
	}

	if ( error.length > 0 ) {
		return Err( error )
	}

	const result = await repository.register(
		userResult.unwrap(),
		passwordResult.unwrap()
	)

	if ( result.isErr() ) {
		error.push( result.unwrapErr() )
		return Err( error )
	}

	return Ok( result.unwrap() )
}
