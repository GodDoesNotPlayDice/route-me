import { Result } from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class AuthUserRepository {
  abstract login( email: Email,
    password: Password ): Promise<Result<User, Error[]>>

  abstract logout( id: UserID ): Promise<Result<boolean, Error>>
}
