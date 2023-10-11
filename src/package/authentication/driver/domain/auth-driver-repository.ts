import { Result } from 'oxide.ts'
import { Driver } from 'src/package/driver/domain/models/driver'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class AuthDriverRepository {
  abstract login( userID: UserID ): Promise<Result<Driver, string>>
  abstract register( passenger: Driver ): Promise<Result<string, string>>
  abstract logout(id : UserID): Promise<Result<boolean, string>>
  abstract delete( id: UserID ): Promise<Result<boolean, string>>
  abstract update( passenger: Driver ): Promise<Result<boolean, string>>
}
