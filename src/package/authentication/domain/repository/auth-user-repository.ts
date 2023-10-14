import { Result } from 'oxide.ts'
import { User } from 'src/package/user/domain/models/user'
import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserPassword } from 'src/package/user/domain/models/user-password'

export abstract class AuthUserRepository {
  abstract login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, Error[]>>

  abstract register(
    user: User,
    password: UserPassword
  ): Promise<Result<string, Error>>

  abstract logout( id: UserID ): Promise<Result<boolean, Error>>

  abstract delete( id: UserID ): Promise<Result<boolean, Error>>

  abstract update( user: User ): Promise<Result<boolean, Error>>
}
