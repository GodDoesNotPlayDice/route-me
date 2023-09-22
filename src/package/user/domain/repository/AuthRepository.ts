import { Result } from 'oxide.ts'
import { UserEmail, UserPassword } from 'src/package/user/domain/value-objects'
import { User } from 'src/package/user/domain/entities';

export abstract class AuthRepository {
  abstract login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>>
  abstract register( user: User ): Promise<Result<boolean, string>>
}
