import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const deleteTrip = async ( dao: TripDao, id: TripID): Promise<Result<boolean, string>> => {
  try {
    const result   = await dao.delete(id)
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'delete trip error' ) )
  }
}
