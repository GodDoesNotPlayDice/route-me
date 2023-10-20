import { Result } from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { User } from 'src/package/user/domain/models/user'

export abstract class AuthUserRepository {
  abstract login( email: Email,
    password: Password ): Promise<Result<User, Error[]>>

  abstract registerUser( user : User,
    password: Password ): Promise<Result<string, Error[]>>

  abstract logout( email: Email ): Promise<Result<boolean, Error>>
  abstract sendResetPassword(  email: Email  ): Promise<Result<boolean, Error>>

  abstract delete( email: Email ): Promise<Result<boolean, Error>>
  }
