import {
  Err,
  None,
  Ok,
  Result
} from 'oxide.ts'
import { Trip } from 'src/app/shared/models/trip/trip'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { newEndTripDate } from 'src/package/trip/domain/models/end-trip-date'
import { newTripDescription } from 'src/package/trip/domain/models/trip-description'
import {
  TripID
} from 'src/package/trip/domain/models/trip-id'
import { newTripState } from 'src/package/trip/domain/models/trip-state'

export const createTrip = async ( dao: TripDao,
  props: {
    id : TripID,
    driverID: DriverID,
    chatID: ChatID,
    startDate: Date,
    startLocationID: LocationID
    endLocationID: LocationID
  } ): Promise<Result<Trip, Error[]>> => {
  const err: Error[] = []

  const end          = newEndTripDate( {
    value: props.startDate
  } )

  if ( end.isErr() ) {
    err.push( end.unwrapErr() )
  }

  const startDate = newValidDate( {
    value: props.startDate
  } )

  if ( startDate.isErr() ) {
    err.push( startDate.unwrapErr() )
  }

  const description = newTripDescription({
    value: ''
  })

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const state = newTripState({
    value: 'Open'
  })

  if ( state.isErr() ) {
    err.push( state.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  const result: Trip = {
    id           : props.id,
    driverID     : props.driverID,
    chatID       : props.chatID,
    endLocation  : props.endLocationID,
    startLocation: props.startLocationID,
    startDate    : startDate.unwrap().value,
    endDate      : end.unwrap().value,
    description  : description.unwrap(),
    state        : state.unwrap(),
    passengersID : [],
    categoryID   : None,
    price        : None,
    seat         : None,
  }

  const response =  await dao.create( result )

  if ( response.isErr() ) {
    err.push( response.unwrapErr() )
    return Err( err )
  }

  return Ok(result)
}
