import { Result } from 'oxide.ts'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class UserDao {
  abstract getAll(): Promise<Result<User[], Error>>

  abstract getById( id: UserID ): Promise<Result<User, Error>>
}
