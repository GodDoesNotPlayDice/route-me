import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Result
} from 'oxide.ts'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { Email } from 'src/package/shared/domain/models/email'
import { Password } from 'src/package/shared/domain/models/password'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import { User } from 'src/package/user/domain/models/user'
import { UserID } from 'src/package/user/domain/models/user-id'

export class AuthUserApi implements AuthUserRepository {

  constructor( private http: HttpClient ) {}

  private url = environment.apiUrl

  async login( email: Email,
    password: Password ): Promise<Result<User, Error[]>> {
    return Err( [ new ApiOperationException() ] )
  }

  async logout( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new ApiOperationException() )
  }
}
