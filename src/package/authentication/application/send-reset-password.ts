import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'

/**
 * Send reset password
 * @throws {UnknownException} - if unknown error
 */
export const sendResetPassword = async (
	repository: AuthUserRepository,
	email: string
): Promise<Result<boolean, Error[]>> => {

	const emailResult = newEmail( {
		value: email
	} )

	if ( emailResult.isErr() ) {
		return Err( [ emailResult.unwrapErr() ] )
	}

	const result = await repository.sendResetPassword( emailResult.unwrap() )

	if ( result.isErr() ) {
		return Err( [ new UnknownException( 'logout user' ) ] )
	}

	return Ok( result.unwrap() )
}
