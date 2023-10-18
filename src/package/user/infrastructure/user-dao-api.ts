import {
  Err,
  Result
} from 'oxide.ts'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

export class UserDaoApi implements UserDao{
  async getAll(): Promise<Result<User[], Error[]>> {
    return Err([new ApiOperationException()])
  }

  async getById( id: UserID ): Promise<Result<User, Error[]>> {
    return Err([new ApiOperationException()])
  }
}
