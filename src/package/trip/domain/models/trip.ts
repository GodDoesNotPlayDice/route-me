import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { CategoryID } from 'src/package/category/domain/models/category-id'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import {
  newTripDescription,
  TripDescription
} from 'src/package/trip/domain/models/trip-description'
import {
  newTripFeeMethod,
  TripFeeMethod
} from 'src/package/trip/domain/models/trip-fee-method'
import {
  newTripID,
  TripID
} from 'src/package/trip/domain/models/trip-id'
import {
  newTripPrice,
  TripPrice,
  TripPriceProps
} from 'src/package/trip/domain/models/trip-price'
import {
  newTripSeat,
  TripSeat
} from 'src/package/trip/domain/models/trip-seat'
import {
  newTripState,
  TripState
} from 'src/package/trip/domain/models/trip-state'

export interface Trip {
  id: TripID
  driverID: DriverID
  categoryID: CategoryID
  chatID: ChatID
  passengersID: PassengerID[]
  startDate: Date
  endDate: Date
  description: TripDescription
  startLocation: LocationID
  endLocation: LocationID
  price: TripPrice
  seat: TripSeat
  fee: TripFeeMethod
  state: TripState
}

export interface TripProps {
  id: string
  driverID: DriverID
  passengers: PassengerID[]
  category: CategoryID
  chat: ChatID
  description: string
  startLocationID: LocationID
  endLocationID: LocationID
  startDate: Date
  endDate: Date
  price: TripPriceProps
  seat: number
  fee: string
  state: string
}

/**
 * Create a valid date instance
 * @throws {DateInvalidException} - if date is invalid
 * @throws {TripIdInvalidException} - if id is invalid
 * @throws {TripDescriptionInvalidException} - if description is invalid
 * @throws {MoneyInvalidException} - if money is invalid
 * @throws {CurrencyInvalidException} - if currency is invalid
 * @throws {TripSeatInvalidException} - if seat is invalid
 * @throws {TripFeeInvalidException} - if trip fee is invalid
 * @throws {TripStateInvalidException} - if state is invalid
 */
export const newTrip = ( props: TripProps ): Result<Trip, Error[]> => {
  const err: Error[] = []

  const endDate = newValidDate( {
    value: props.endDate
  } )

  if ( endDate.isErr() ) {
    err.push( endDate.unwrapErr() )
  }

  const startDate = newValidDate( {
    value: props.startDate
  } )

  if ( startDate.isErr() ) {
    err.push( startDate.unwrapErr() )
  }

  const id = newTripID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const description = newTripDescription( {
    value: props.description
  } )

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const price = newTripPrice( {
    amount  : props.price.amount,
    currency: props.price.currency
  } )

  if ( price.isErr() ) {
    err.push( ...price.unwrapErr() )
  }

  const seat = newTripSeat( {
    value: props.seat
  } )

  if ( seat.isErr() ) {
    err.push( seat.unwrapErr() )
  }

  const fee = newTripFeeMethod( {
    value: props.fee
  } )

  if ( fee.isErr() ) {
    err.push( fee.unwrapErr() )
  }

  const state = newTripState( {
    value: props.state
  } )

  if ( state.isErr() ) {
    err.push( state.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id           : id.unwrap(),
      description  : description.unwrap(),
      startDate    : startDate.unwrap().value,
      endDate      : endDate.unwrap().value,
      fee          : fee.unwrap(),
      price        : price.unwrap(),
      seat         : seat.unwrap(),
      state        : state.unwrap(),
      driverID     : props.driverID,
      passengersID : props.passengers,
      categoryID   : props.category,
      chatID       : props.chat,
      startLocation: props.startLocationID,
      endLocation  : props.endLocationID
    }
  )
}
