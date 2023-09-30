import { Result } from 'oxide.ts'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class UserDao { // Data access object

  abstract getAll(): Promise<Result<User[], string>>
  abstract getById( id: UserID ): Promise<Result<User, string>>
}
