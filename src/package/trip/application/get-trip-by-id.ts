import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const getTripByID = async ( dao: TripDao, id: TripID): Promise<Result<Trip, string>> => {
  try {
    const result   = await dao.getById(id)
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'get trip by id error' ) )
  }
}
