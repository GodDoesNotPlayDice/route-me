import { Result } from 'oxide.ts'
import { User } from 'src/package/user/domain/entities'
import {
  UserID
} from 'src/package/user/domain/value-objects'

export abstract class AuthDAO {
  abstract getAll(): Promise<Result<User[], string>>
  abstract delete(id : UserID): Promise<Result<boolean, string>>
  abstract update(user: User): Promise<Result<boolean, string>>
}
