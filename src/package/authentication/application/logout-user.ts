import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserID } from 'src/package/user/domain/models/user-id'

/**
 * Logout user
 * @throws {UnknownException} - if unknown error
 */
export const logoutUser = async (
	repository: AuthUserRepository,
	id: UserID
): Promise<Result<boolean, Error>> => {
	const result = await repository.logout( id )

	if ( result.isErr() ) {
		return Err( new UnknownException( 'logout user' ) )
	}

	return Ok( result.unwrap() )
}
