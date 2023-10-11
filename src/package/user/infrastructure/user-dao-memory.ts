import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/repository/user-dao'

export class UserDaoMemory implements UserDao {

	public getAll(): Promise<Result<User[], string>> {
		return Promise.resolve( Ok( [] ) )
	}

	public getById( id: UserID ): Promise<Result<User, string>> {
		return Promise.resolve( Err( '' ) )
	}
}
