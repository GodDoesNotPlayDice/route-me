import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripState } from 'src/app/shared/models/trip-state'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const getAllByState = async ( dao: TripDao, state: TripState): Promise<Result<Trip[], string>> => {
  try {
    const result   = await dao.getAllByState(state)
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'create trip error' ) )
  }
}
