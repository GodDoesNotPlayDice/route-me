import { Result } from 'oxide.ts'
import { User } from '../entities/User'
import { UserEmail } from '../value-objects/UserEmail'
import { UserPassword } from '../value-objects/UserPassword'

export abstract class AuthRepository {
  abstract login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>>

  abstract register( user: User ): Promise<Result<boolean, string>>

  abstract getAll(): Promise<Result<User[], string>>

}
