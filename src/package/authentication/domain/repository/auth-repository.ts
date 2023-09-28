import { Result } from 'oxide.ts'
import { UserID } from 'src/package/user'
import { User } from 'src/package/user/domain/models';

export abstract class AuthRepository {
  abstract login( email: string,
    password: string ): Promise<Result<User, string>>
  abstract register(
    id: string,
    email: string,
    password: string,
  ): Promise<Result<boolean, string>>
  abstract delete(id : UserID): Promise<Result<boolean, string>>
  abstract update(user: User): Promise<Result<boolean, string>>
  abstract create(user: User): Promise<Result<boolean, string>>
}
