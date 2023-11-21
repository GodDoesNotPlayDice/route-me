import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

/**
 * Get all users
 * @throws {InfrastructureOperationException} - if operation failed
 */
export const getAllUser = async ( dao: UserDao ): Promise<Result<User[], Error[]>> => {
	const result = await dao.getAll()

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
