import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
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
import {
  newTrip,
  Trip
} from 'src/package/trip/domain/models/trip'

/**
 * Create a trip instance from json
 * @throws {DateInvalidException} - if date is invalid
 * @throws {TripIdInvalidException} - if trip id is invalid
 * @throws {TripDescriptionInvalidException} - if description is invalid
 * @throws {PassengerIdInvalidException} - if passenger id is invalid
 * @throws {DriverIdInvalidException} - if driver id is invalid
 * @throws {CategoryIdInvalidException} - if category id is invalid
 * @throws {ChatIdInvalidException} - if chat id is invalid
 * @throws {LocationIdInvalidException} - if location id is invalid
 * @throws {MoneyInvalidException} - if money is invalid
 * @throws {CurrencyInvalidException} - if currency is invalid
 * @throws {TripSeatInvalidException} - if seat is invalid
 * @throws {TripFeeInvalidException} - if trip fee is invalid
 * @throws {TripStateInvalidException} - if state is invalid
 */
export const tripFromJSON = ( json: Record<string, any> ): Result<Trip, Error[]> => {
  const err: Error[] = []

  const passenger: PassengerID[] = []
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

  if ( err.length > 0 ) {
    return Err( err )
  }
  const driverIDResult = newDriverID( {
    value: json['driverID']
  } )

  if ( driverIDResult.isErr() ) {
    err.push( driverIDResult.unwrapErr() )
  }

  const categoryResult = newCategoryID( {
    value: json['category']
  } )

  if ( categoryResult.isErr() ) {
    err.push( categoryResult.unwrapErr() )
  }

  const chatResult = newChatID( {
    value: json['chat']
  } )

  if ( chatResult.isErr() ) {
    err.push( chatResult.unwrapErr() )
  }

  const locationStart = newLocationID( {
    value: json['startLocationID']
  } )

  if ( locationStart.isErr() ) {
    err.push( locationStart.unwrapErr() )
  }

  const locationEnd = newLocationID( {
    value: json['endLocationID']
  } )

  if ( locationEnd.isErr() ) {
    err.push( locationEnd.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  const result = newTrip( {
    price          : {
      amount  : json['price']['amount'],
      currency: json['price']['currency']
    },
    seat           : json['seat'],
    fee            : json['fee'],
    state          : json['state'],
    driverID       : driverIDResult.unwrap(),
    category       : categoryResult.unwrap(),
    chat           : chatResult.unwrap(),
    passengers     : passenger,
    id             : json['id'],
    description    : json['description'],
    startDate      : new Date( json['startDate'] ),
    endDate        : new Date( json['endDate'] ),
    startLocationID: locationStart.unwrap(),
    endLocationID  : locationEnd.unwrap()
  } )

  if ( result.isErr() ) {
    err.push( ...result.unwrapErr() )
    return Err( err )
  }

  return Ok( result.unwrap() )
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
        startDate    : dateToJSON( trip.startDate ),
        endDate      : dateToJSON( trip.endDate ),
        startLocation: trip.startLocation.value,
        endLocation  : trip.endLocation.value,
        price        : {
          amount  : trip.price.amount,
          currency: trip.price.currency
        },
        seat         : trip.seat.value,
        fee          : trip.fee,
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
