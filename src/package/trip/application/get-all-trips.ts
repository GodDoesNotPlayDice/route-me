import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const getAllTrips = async ( dao: TripDao): Promise<Result<Trip[], string>> => {
  try {
    const result   = await dao.getAll()
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'get all trips error' ) )
  }
}
