import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const updateTrip = async ( dao: TripDao, trip: Trip): Promise<Result<boolean, string>> => {
  try {
    const result   = await dao.update(trip)
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'update trip error' ) )
  }
}
