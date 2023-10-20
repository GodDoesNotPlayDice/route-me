import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Result
} from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

export class UserDaoApi implements UserDao {

  constructor( private http: HttpClient ) {}

  private url = environment.apiUrl

  async delete( email: Email ): Promise<Result<boolean, Error>> {
    return Err( new ApiOperationException() )
  }

  async getAll(): Promise<Result<User[], Error[]>> {
    return Err( [ new ApiOperationException() ] )
  }

  async getByEmail( email: Email ): Promise<Result<User, Error[]>> {
    return Err( [ new ApiOperationException() ] )
  }

  async create( user: User,
    password: Password ): Promise<Result<string, Error[]>> {
    return Err( [new ApiOperationException()] )
  }

}
