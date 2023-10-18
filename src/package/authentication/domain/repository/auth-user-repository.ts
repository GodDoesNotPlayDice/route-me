import { Result } from 'oxide.ts'
import { User } from 'src/package/user/domain/models/user'
import { Email } from 'src/package/shared/domain/models/email'
import { UserID } from 'src/package/user/domain/models/user-id'
import { Password } from 'src/package/shared/domain/models/password'

export abstract class AuthUserRepository {
  abstract login( email: Email,
    password: Password ): Promise<Result<User, Error[]>>

  abstract register(
    user: User,
    password: Password
  ): Promise<Result<string, Error>>

  abstract logout( id: UserID ): Promise<Result<boolean, Error>>
  abstract getByEmail( email: Email ): Promise<Result<boolean, Error[]>>

  abstract delete( email : Email ): Promise<Result<boolean, Error>>

  abstract update( user: User ): Promise<Result<boolean, Error>>
}
