import {
  Err,
  None,
  Ok,
  Option,
  Result,
  Some
} from 'oxide.ts'
import { Trip } from 'src/app/shared/models/trip/trip'
import {
  CategoryID,
  newCategoryID
} from 'src/package/category/domain/models/category-id'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { newLocationID } from 'src/package/location/domain/models/location-id'
import {
  newPassengerID,
  PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import {
  dateFromJSON,
  dateToJSON
} from 'src/package/shared/config/helper/date/date-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { newTripDescription } from 'src/package/trip/domain/models/trip-description'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import {
  newTripPrice,
  TripPrice
} from 'src/package/trip/domain/models/trip-price'
import {
  newTripSeat,
  TripSeat
} from 'src/package/trip/domain/models/trip-seat'
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

  let categoryID: Option<CategoryID> = None
  if ( json['categoryID'] !== '' ) {
    const categoryIDResult = newCategoryID( {
      value: json['categoryID'] ?? ''
    } )

    if ( categoryIDResult.isErr() ) {
      err.push( categoryIDResult.unwrapErr() )
    }
    else {
      categoryID = Some( categoryIDResult.unwrap() )
    }
  }

  const chatID = newChatID( {
    value: json['chatID'] ?? ''
  } )

  if ( chatID.isErr() ) {
    err.push( chatID.unwrapErr() )
  }

  const locationStart = newLocationID( {
    value: json['startLocation'] ?? ''
  } )

  if ( locationStart.isErr() ) {
    err.push( locationStart.unwrapErr() )
  }

  const locationEnd = newLocationID( {
    value: json['endLocation'] ?? ''
  } )

  if ( locationEnd.isErr() ) {
    err.push( locationEnd.unwrapErr() )
  }

  let price: Option<TripPrice> = None
  if ( json['price'] !== '' ) {
    const priceResult = newTripPrice( {
      amount  : json['price'] === undefined ? '' : json['price']['amount'] ??
        '',
      currency: json['price'] === undefined ? '' : json['price']['currency'] ??
        ''
    } )
    if ( priceResult.isErr() ) {
      err.push( ...priceResult.unwrapErr() )
    }
    else {
      price = Some( priceResult.unwrap() )
    }
  }

  let seat: Option<TripSeat> = None
  if ( json['seat'] !== '' ) {
    const seatResult = newTripSeat( {
      value: json['seat'] ?? ''
    } )
    if ( seatResult.isErr() ) {
      err.push( seatResult.unwrapErr() )
    }
    else {
      seat = Some( seatResult.unwrap() )
    }
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
    value: dateFromJSON( json['endDate'] ?? '' )
  } )

  if ( endDate.isErr() ) {
    err.push( endDate.unwrapErr() )
  }

  const startDate = newValidDate( {
    value: dateFromJSON( json['startDate'] ?? '' )
  } )

  if ( startDate.isErr() ) {
    err.push( startDate.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  //TODO: verificar parse date
  return Ok( {
    price        : price,
    seat         : seat,
    description  : description.unwrap(),
    categoryID   : categoryID,
    state        : state.unwrap(),
    id           : id.unwrap(),
    startDate    : startDate.unwrap().value,
    endDate      : endDate.unwrap().value,
    driverID     : driverID.unwrap(),
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

    //TODO: al hacer separacion front y backend, se debe verificar que no sean None
    return Ok( {
        id           : trip.id.value,
        description  : trip.description.value,
        driverID     : trip.driverID.value,
        passengers   : passengers,
        category     : trip.categoryID.isNone()
          ? ''
          : trip.categoryID.unwrap().value,
        chat         : trip.chatID.value,
        startDate    : dateToJSON( trip.startDate ),
        endDate      : dateToJSON( trip.endDate ),
        startLocation: trip.startLocation.value,
        endLocation  : trip.endLocation.value,
        price        : {
          amount  : trip.price.isNone() ? '' : trip.price.unwrap().amount,
          currency: trip.price.isNone() ? '' : trip.price.unwrap().currency
        },
        seat         : trip.seat.isNone() ? '' : trip.seat.unwrap().value,
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
