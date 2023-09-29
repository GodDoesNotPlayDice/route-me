import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  User,
  UserDao
} from 'src/package/user/domain'

//TODO: cambiar use case a funciones
export class GetAllUsers {
  constructor( private repository: UserDao ) {}

  async execute(): Promise<Result<User[], string>> {
    const result = await this.repository.getAll()
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( result.unwrap() ) )
  }
}
