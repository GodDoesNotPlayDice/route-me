import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  newTripHistoryID,
  TripHistoryID
} from 'src/package/trip-history/domain/models/trip-history-id'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface TripHistory {
  id: TripHistoryID
  userID: UserID
  tripID: TripID
}

export interface TripHistoryProps {
  id: string
  userID: UserID
  tripID: TripID
}

/**
 * Create a trip history instance
 * @throws {TripHistoryIdInvalidException} - if id is invalid
 */
export const newTripHistory = ( props: TripHistoryProps ): Result<TripHistory, Error> => {
  const id = newTripHistoryID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    return Err( id.unwrapErr() )
  }

  return Ok( {
      id    : id.unwrap(),
      userID: props.userID,
      tripID: props.tripID
    }
  )
}

