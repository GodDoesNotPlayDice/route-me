import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	User,
	UserDao,
	UserID
} from 'src/package/user/domain'

export class UserDaoMemory implements UserDao {

	public getAll(): Promise<Result<User[], string>> {
		return Promise.resolve( Ok( [] ) )
	}

	public getById( id: UserID ): Promise<Result<User, string>> {
		return Promise.resolve( Err( '' ) )
	}
}
