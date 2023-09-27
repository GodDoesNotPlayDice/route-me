import {
  Ok,
  Result
} from 'oxide.ts'
import {
  AuthDAO,
  User,
  UserID
} from 'src/package/user/domain'

export class AuthDaoMemory implements AuthDAO {
  public create( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }

  public delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }

  public getAll(): Promise<Result<User[], string>> {
    return Promise.resolve( Ok([]) )
  }

  public update( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok(true) )
  }

}
