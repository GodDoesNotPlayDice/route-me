import { Result } from 'oxide.ts'
import {
  UserEmail,
  UserID,
  UserPassword
} from 'src/package/user'
import { User } from 'src/package/user/domain/models';

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
