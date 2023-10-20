import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

/**
 * Get all passengers
 */
export const getAllPassenger = async ( dao: PassengerDao ): Promise<Result<Passenger[], Error[]>> => {
  const result = await dao.getAll()

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
