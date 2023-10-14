import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { newCategoryName } from 'src/package/category/domain/models/category-name'
import { Location } from 'src/package/location/domain/models/location'
import { newLocationCountryCode } from 'src/package/location/domain/models/location-country-code'
import { newLocationID } from 'src/package/location/domain/models/location-id'
import { newLocationName } from 'src/package/location/domain/models/location-name'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { newPosition } from 'src/package/position-api/domain/models/position'
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

  const startLocation = createLocation( json['startLocation']  ?? '' )

  if ( startLocation.isErr() ) {
    err.push( ...startLocation.unwrapErr() )
  }

  const endLocation = createLocation( json['endLocation'] ?? '')

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

const createLocation = ( json: Record<string, any> ): Result<Location, Error[]> =>{
  const err: Error[] = []
  const locationID = newLocationID({
    value: json['id'] ?? ''
  })

  if ( locationID.isErr() ) {
    err.push( locationID.unwrapErr() )
  }

  const locationName = newLocationName({
    value: json['name'] ?? ''
  })

  if ( locationName.isErr() ) {
    err.push( locationName.unwrapErr() )
  }

  const locationCountryCode = newLocationCountryCode({
    value: json['countryCode'] ?? ''
  })

  if ( locationCountryCode.isErr() ) {
    err.push( locationCountryCode.unwrapErr() )
  }

  const position = newPosition({
    lat  : json['position'] === undefined ? '' : json['position']['latitude'] ?? '',
    lng  : json['position'] === undefined ? '' : json['position']['longitude'] ?? '',
  })

  if ( position.isErr() ) {
    err.push( position.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok({
    id: locationID.unwrap(),
    name: locationName.unwrap(),
    countryCode: locationCountryCode.unwrap(),
    position: position.unwrap()
  })
}
