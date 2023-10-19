import { Result } from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { User } from 'src/package/user/domain/models/user'

export abstract class UserDao {
  abstract getAll(): Promise<Result<User[], Error[]>>

  abstract create(
    user: User,
    password: Password
  ): Promise<Result<string, Error>>

  abstract getByEmail( email: Email ): Promise<Result<User, Error[]>>

  abstract delete( email: Email ): Promise<Result<boolean, Error>>
}
