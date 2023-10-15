import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { newCategoryName } from 'src/package/category/domain/models/category-name'
import { newLocation } from 'src/package/location/domain/models/location'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import {
  dateFromJSON,
  dateToJSON
} from 'src/package/shared/config/helper/date/date-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { newTripID } from 'src/package/trip/domain/models/trip-id'

/**
 * Create a json from near trip instance
 * @throws {UnknownException} - if unknown error
 */
export const nearTripToJson = ( nearTrip: NearTrip ): Result<Record<string, any>, Error> => {
  try {
    return Ok( {
      id           : nearTrip.id.value,
      startDate    : dateToJSON( nearTrip.startDate.value ),
      endDate      : dateToJSON( nearTrip.endDate.value ),
      categoryName : nearTrip.categoryName.value,
      startLocation: {
        id         : nearTrip.startLocation.id.value,
        name       : nearTrip.startLocation.name.value,
        countryCode: nearTrip.startLocation.countryCode.value,
        position   : {
          latitude : nearTrip.startLocation.position.lat,
          longitude: nearTrip.startLocation.position.lng
        }
      },
      endLocation  : {
        id         : nearTrip.endLocation.id.value,
        name       : nearTrip.endLocation.name.value,
        countryCode: nearTrip.endLocation.countryCode.value,
        position   : {
          latitude : nearTrip.endLocation.position.lat,
          longitude: nearTrip.endLocation.position.lng
        }
      }
    } )
  }
  catch ( e ) {
    return Err( new UnknownException( 'error near trip to json' ) )
  }
}

/**
 * Create a near trip instance from json
 * @throws {TripIdInvalidException} - if trip id is invalid
 * @throws {CategoryNameInvalidException} - if category name is invalid
 * @throws {DateInvalidException} - if date is invalid
 * @throws {LocationIdInvalidException} - if location id is invalid
 * @throws {LocationNameInvalidException} - if location name is invalid
 * @throws {LocationCountryCodeInvalidException} - if location country code is invalid
 * @throws {PositionInvalidException} - if location position is invalid
 */
export const nearTripFromJson = ( json: Record<string, any> ): Result<NearTrip, Error[]> => {
  const err: Error[] = []

  const id = newTripID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const categoryName = newCategoryName( {
    value: json['categoryName'] ?? ''
  } )

  if ( categoryName.isErr() ) {
    err.push( categoryName.unwrapErr() )
  }

  const startDate = newValidDate( {
    value: dateFromJSON( json['startDate'] ) ?? ''
  } )

  if ( startDate.isErr() ) {
    err.push( startDate.unwrapErr() )
  }

  const endDate = newValidDate( {
    value: dateFromJSON( json['endDate'] ) ?? ''
  } )

  if ( endDate.isErr() ) {
    err.push( endDate.unwrapErr() )
  }

  const startLocation = newLocation( {
    id         : json['startLocation']?.id ?? '',
    name       : json['startLocation']?.name ?? '',
    countryCode: json['startLocation']?.countryCode ?? '',
    position   : {
      lat: json['startLocation']?.position?.latitude ?? '',
      lng: json['startLocation']?.position?.longitude ?? ''
    }
  } )

  if ( startLocation.isErr() ) {
    err.push( ...startLocation.unwrapErr() )
  }

  const endLocation = newLocation( {
    id         : json['endLocation']?.id ?? '',
    name       : json['endLocation']?.name ?? '',
    countryCode: json['endLocation']?.countryCode ?? '',
    position   : {
      lat: json['endLocation']?.position?.latitude ?? '',
      lng: json['endLocation']?.position?.longitude ?? ''
    }
  } )

  if ( endLocation.isErr() ) {
    err.push( ...endLocation.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id           : id.unwrap(),
      categoryName : categoryName.unwrap(),
      endDate      : endDate.unwrap(),
      startDate    : startDate.unwrap(),
      startLocation: startLocation.unwrap(),
      endLocation  : endLocation.unwrap()
    }
  )
}

