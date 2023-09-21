import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  AuthRepository,
  User,
} from 'src/package/user/domain'

export class GetAllUsers {
  constructor( private repository: AuthRepository ) {}

  async execute(): Promise<Result<User[], string>>{
    const result = await this.repository.getAll()
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( result.unwrap() ) )
  }
}
