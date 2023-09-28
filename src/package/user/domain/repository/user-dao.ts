import { Result } from 'oxide.ts'
import { User, UserID } from 'src/package/user/domain/models'

export abstract class UserDao { // Data access object

  abstract getAll(): Promise<Result<User[], string>>
  abstract getById( id: UserID ): Promise<Result<User, string>>
}
