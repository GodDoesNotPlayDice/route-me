import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  User,
  UserDao
} from 'src/package/user/domain'

export const getAllUsers = async ( repository: UserDao ): Promise<Result<User[], string>> => {
  const result   = await repository.getAll()
  const response = result.unwrap()

  if ( result.isErr() ) {
    return Promise.resolve( Err( result.unwrapErr() ) )
  }

  return Promise.resolve( Ok( response ) )
}
