import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { newEmail } from 'src/package/shared/domain/models/email'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

/**
 * Get user by email
 * @throws {InfrastructureOperationException} - if operation failed
 */
export const getUserByEmail = async (
	dao: UserDao,
	email: string
): Promise<Result<User, Error[]>> => {
	const emailResult = newEmail( {
		value: email
	} )

	if ( emailResult.isErr() ) {
		return Err( [ emailResult.unwrapErr() ] )
	}

	const result = await dao.getByEmail( emailResult.unwrap() )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
