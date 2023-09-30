import { Result } from 'oxide.ts'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export abstract class AuthRepository {
  abstract login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>>
  abstract register(
    email: UserEmail,
    password: UserPassword,
  ): Promise<Result<boolean, string>>
  abstract delete(id : UserID): Promise<Result<boolean, string>>
  abstract update(user: User): Promise<Result<boolean, string>>
  abstract create(user: User): Promise<Result<boolean, string>>
}
