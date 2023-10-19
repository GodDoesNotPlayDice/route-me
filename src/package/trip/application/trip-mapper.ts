import {
  Err,
  None,
  Ok,
  Option,
  Result,
  Some
} from 'oxide.ts'
import {
  categoryFromJson,
  categoryToJson
} from 'src/package/category/application/category-mapper'
import { Category } from 'src/package/category/domain/models/category'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import {
  driverFromJson,
  driverToJson
} from 'src/package/driver/application/driver-mapper'
import {
  locationFromJson,
  locationToJson
} from 'src/package/location/application/location-mapper'
import {
  passengerFromJson,
  passengerToJson
} from 'src/package/passenger/application/passenger-mapper'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import {
  dateFromJSON,
  dateToJSON
} from 'src/package/shared/config/helper/date/date-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { Trip } from 'src/package/trip/domain/models/trip'
import { newTripDescription } from 'src/package/trip/domain/models/trip-description'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { newTripPrice } from 'src/package/trip/domain/models/trip-price'
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
 * @throws {UserIdInvalidException} - if passenger id is invalid
 * @throws {CurrencyInvalidException} - if currency is invalid
 */
export const tripFromJSON = ( json: Record<string, any> ): Result<Trip, Error[]> => {
  const err: Error[] = []

  const passenger: Passenger[] = []
  if ( json['passengers'] ) {
    for ( const user of Object.values( json['passengers'] ) ) {
      const passengerResult = passengerFromJson( user as Record<string, any> )
      if ( passengerResult.isErr() ) {
        err.push( ...passengerResult.unwrapErr() )
      }
      else {
        passenger.push( passengerResult.unwrap() )
      }
    }
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  const driver = driverFromJson( json['driver'] )

  if ( driver.isErr() ) {
    err.push( ...driver.unwrapErr() )
  }

  let category: Option<Category> = None
  if ( json['category'] !== null ) {
    const categoryResult = categoryFromJson( {
      value: json['category'] ?? ''
    } )

    if ( categoryResult.isErr() ) {
      err.push( ...categoryResult.unwrapErr() )
    }
    else {
      category = Some( categoryResult.unwrap() )
    }
  }

  const chatID = newChatID( {
    value: json['chat_id'] ?? ''
  } )

  if ( chatID.isErr() ) {
    err.push( chatID.unwrapErr() )
  }

  const locationStart = locationFromJson( json['start_location'] )

  if ( locationStart.isErr() ) {
    err.push( ...locationStart.unwrapErr() )
  }

  const locationEnd = locationFromJson( json['end_location'] )

  if ( locationEnd.isErr() ) {
    err.push( ...locationEnd.unwrapErr() )
  }

  const price = newTripPrice( {
    amount  : json['price']?.amount ?? '',
    currency: json['price']?.currency ?? ''
  } )

  if ( price.isErr() ) {
    err.push( ...price.unwrapErr() )
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
    value: dateFromJSON( json['end_date'] ?? '' )
  } )

  if ( endDate.isErr() ) {
    err.push( endDate.unwrapErr() )
  }

  const startDate = newValidDate( {
    value: dateFromJSON( json['start_date'] ?? '' )
  } )

  if ( startDate.isErr() ) {
    err.push( startDate.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    price        : price.unwrap(),
    description  : description.unwrap(),
    category     : category,
    state        : state.unwrap(),
    id           : id.unwrap(),
    startDate    : startDate.unwrap().value,
    endDate      : endDate.unwrap().value,
    driver       : driver.unwrap(),
    chatID       : chatID.unwrap(),
    passengers   : passenger,
    startLocation: locationStart.unwrap(),
    endLocation  : locationEnd.unwrap()
  } )
}

/**
 * Create a trip instance from json
 * @throws {UnknownException} - if unknown error
 */
export const tripToJSON = ( trip: Trip ): Result<Record<string, any>, Error[]> => {

  try {
    const err: Error[] = []


    const json: Record<string, any> = {
      id         : trip.id.value,
      chat_id    : trip.chatID.value,
      start_date : dateToJSON( trip.startDate ),
      end_date   : dateToJSON( trip.endDate ),
      description: trip.description.value,
      state      : trip.state,
      price      : {
        amount  : trip.price.amount.value,
        currency: trip.price.currency.value
      }
    }

    const driver = driverToJson( trip.driver )

    if ( driver.isErr() ) {
      err.push( ...driver.unwrapErr() )
    }
    else {
      json['driver'] = driver.unwrap()
    }

    if ( trip.category.isSome() ) {
      const categoryResult = categoryToJson( trip.category.unwrap() )

      if ( categoryResult.isErr() ) {
        err.push( categoryResult.unwrapErr() )
      }
      else {
        json['category'] = categoryResult.unwrap()
      }
    }
    else {
      json['category'] = null
    }

    const startLocation = locationToJson( trip.startLocation )

    if ( startLocation.isErr() ) {
      err.push( startLocation.unwrapErr() )
    }
    else {
      json['start_location'] = startLocation.unwrap()
    }

    const endLocation = locationToJson( trip.endLocation )

    if ( endLocation.isErr() ) {
      err.push( endLocation.unwrapErr() )
    }
    else {
      json['end_location'] = endLocation.unwrap()
    }

    const passengers: Record<string, any>[] = []
    for ( const passenger of trip.passengers ) {
      const passengerResult = passengerToJson( passenger )

      if ( passengerResult.isErr() ) {
        err.push()
      }
      else {
        passengers.push( passengerResult.unwrap() )
      }
    }

    if ( passengers.length > 0 ) {
      json['passengers'] = passengers
    }

    if ( err.length > 0 ) {
      return Err( err )
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error trip to json' )
    return Err( [ err ] )
  }
}
