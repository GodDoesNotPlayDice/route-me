import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Trip } from 'src/app/shared/models/trip/trip'
import { newCategoryID } from 'src/package/category/domain/models/category-id'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { newLocationID } from 'src/package/location/domain/models/location-id'
import {
  newPassengerID,
  PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import { dateToJSON } from 'src/package/shared/config/helper/date/date-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { newTripDescription } from 'src/package/trip/domain/models/trip-description'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { newTripPrice } from 'src/package/trip/domain/models/trip-price'
import { newTripSeat } from 'src/package/trip/domain/models/trip-seat'
import { newTripState } from 'src/package/trip/domain/models/trip-state'

/**
 * Create a trip instance from json
 * @throws {DriverIdInvalidException} - if driver id is invalid
 * @throws {CategoryIdInvalidException} - if category id is invalid
 * @throws {ChatIdInvalidException} - if chat id is invalid
 * @throws {LocationIdInvalidException} - if location id is invalid
 * @throws {MoneyInvalidException} - if money is invalid
 * @throws {TripSeatInvalidException} - if seat is invalid
 * @throws {TripStateInvalidException} - if state is invalid
 * @throws {TripIdInvalidException} - if trip id is invalid
 * @throws {DateInvalidException} - if date is invalid
 * @throws {TripDescriptionInvalidException} - if description is invalid
 * @throws {PassengerIdInvalidException} - if passenger id is invalid
 * @throws {CurrencyInvalidException} - if currency is invalid
 */
export const tripFromJSON = ( json: Record<string, any> ): Result<Trip, Error[]> => {
  const err: Error[] = []

  const passenger: PassengerID[] = []
  if ( json['passengers'] ) {
    for ( const id of Object.values( json['passengers'] ) ) {
      const passengerIDResult = newPassengerID( {
        value: id as string
      } )
      if ( passengerIDResult.isErr() ) {
        err.push( passengerIDResult.unwrapErr() )
      }
      else {
        passenger.push( passengerIDResult.unwrap() )
      }
    }
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  const driverID = newDriverID( {
    value: json['driverID'] ?? ''
  } )

  if ( driverID.isErr() ) {
    err.push( driverID.unwrapErr() )
  }

  const categoryID = newCategoryID( {
    value: json['category'] ?? ''
  } )

  if ( categoryID.isErr() ) {
    err.push( categoryID.unwrapErr() )
  }

  const chatID = newChatID( {
    value: json['chat'] ?? ''
  } )

  if ( chatID.isErr() ) {
    err.push( chatID.unwrapErr() )
  }

  const locationStart = newLocationID( {
    value: json['startLocationID'] ?? ''
  } )

  if ( locationStart.isErr() ) {
    err.push( locationStart.unwrapErr() )
  }

  const locationEnd = newLocationID( {
    value: json['endLocationID'] ?? ''
  } )

  if ( locationEnd.isErr() ) {
    err.push( locationEnd.unwrapErr() )
  }

  const price = newTripPrice( {
    amount  : json['price'] === undefined ? '' : json['price']['amount'] ===
    undefined ? '' : json['price']['amount'],
    currency: json['price'] === undefined ? '' : json['price']['currency'] ===
    undefined ? '' : json['price']['currency']
  } )

  if ( price.isErr() ) {
    err.push( ...price.unwrapErr() )
  }

  const seat = newTripSeat( {
    value: json['seat'] ?? ''
  } )

  if ( seat.isErr() ) {
    err.push( seat.unwrapErr() )
  }

  const state = newTripState( {
    value: json['state'] ?? ''
  } )

  if ( state.isErr() ) {
    err.push( state.unwrapErr() )
  }

  const id = newTripID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const description = newTripDescription( {
    value: json['description'] ?? ''
  } )

  if ( description.isErr() ) {
    err.push( description.unwrapErr() )
  }

  const endDate = newValidDate( {
    value: json['endDate'] ?? ''
  } )

  if ( endDate.isErr() ) {
    err.push( endDate.unwrapErr() )
  }

  const startDate = newValidDate( {
    value: json['startDate'] ?? ''
  } )

  if ( startDate.isErr() ) {
    err.push( startDate.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    id           : id.unwrap(),
    price        : price.unwrap(),
    seat         : seat.unwrap(),
    state        : state.unwrap(),
    description  : description.unwrap(),
    startDate    : startDate.unwrap(),
    endDate      : endDate.unwrap(),
    driverID     : driverID.unwrap(),
    categoryID   : categoryID.unwrap(),
    chatID       : chatID.unwrap(),
    passengersID : passenger,
    startLocation: locationStart.unwrap(),
    endLocation  : locationEnd.unwrap()
  } )
}

/**
 * Create a trip instance from json
 * @throws {UnknownException} - if unknown error
 */
export const tripToJSON = ( trip: Trip ): Result<Record<string, any>, Error> => {

  try {
    const passengers = trip.passengersID.map(
      ( passengers: PassengerID ) => {
        return passengers.value
      } )

    return Ok( {
        id           : trip.id.value,
        description  : trip.description.value,
        driverID     : trip.driverID.value,
        passengers   : passengers,
        category     : trip.categoryID.value,
        chat         : trip.chatID.value,
        startDate    : dateToJSON( trip.startDate.value ),
        endDate      : dateToJSON( trip.endDate.value ),
        startLocation: trip.startLocation.value,
        endLocation  : trip.endLocation.value,
        price        : {
          amount  : trip.price.amount,
          currency: trip.price.currency
        },
        seat         : trip.seat.value,
        state        : trip.state
      }
    )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error trip to json' )
    return Err( err )
  }
}
