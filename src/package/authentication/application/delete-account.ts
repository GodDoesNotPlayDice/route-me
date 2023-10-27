import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { Email } from 'src/package/shared/domain/models/email'

/**
 * Delete a user by email
 * @throws {InfrastructureOperationException} - if operation failed
 */
export const deleteAccount = async (
	dao: AuthUserRepository,
	email: Email
): Promise<Result<boolean, Error>> => {
	const result = await dao.delete( email )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
