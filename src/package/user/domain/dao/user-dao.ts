import { Result } from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { User } from 'src/package/user/domain/models/user'

export abstract class UserDao {
	abstract getAll(): Promise<Result<User[], Error[]>>

	abstract getByEmail( email: Email ): Promise<Result<User, Error[]>>
}
