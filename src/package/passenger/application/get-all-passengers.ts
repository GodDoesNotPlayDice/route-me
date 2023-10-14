import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

export const getAllUsers = async ( repository: PassengerDao ): Promise<Result<Passenger[], Error[]>> => {
  const result   = await repository.getAll()
  const response = result.unwrap()

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( response )
}
