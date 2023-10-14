import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import {
  newTripHistory,
  TripHistory
} from 'src/package/trip-history/domain/models/trip-history'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Create a json from trip history instance
 * @throws {UnknownException} - if unknown error
 */
export const tripHistoryToJson = ( tripHistory: TripHistory ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id    : tripHistory.id.value,
      userID: tripHistory.userID.value,
      tripID: tripHistory.tripID.value
    }
    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error trip history to json' )
    return Err( err )
  }
}

/**
 * Create a trip history instance
 * @throws {TripHistoryIdInvalidException} - if id is invalid
 * @throws {UserIdInvalidException} - if id is invalid
 * @throws {TripIdInvalidException} - if id is invalid
 */
export const tripHistoryFromJson = ( json: Record<string, any> ): Result<TripHistory, Error[]> => {
  const error: Error[] = []

  const userID = newUserID( {
    value: json['userID']
  } )

  if ( userID.isErr() ) {
    error.push( userID.unwrapErr() )
  }

  const tripID = newTripID( {
    value: json['tripID']
  } )

  if ( tripID.isErr() ) {
    error.push( tripID.unwrapErr() )
  }

  if ( error.length > 0 ) {
    return Err( error )
  }

  const result = newTripHistory( {
    id    : json['id'],
    userID: userID.unwrap(),
    tripID: tripID.unwrap()
  } )

  if ( result.isErr() ) {
    error.push( result.unwrapErr() )
    return Err( error )
  }

  return Ok( result.unwrap() )
}
