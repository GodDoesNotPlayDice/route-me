import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  Location,
  newLocation
} from 'src/package/location/domain/models/location'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a location instance from json
 * @throws {LocationIdInvalidException} - if id is invalid
 * @throws {LocationNameInvalidException} - if name is invalid
 * @throws {LocationCountryCodeInvalidException} - if country code is invalid
 * @throws {PositionInvalidException} - if position is invalid
 */
export const locationFromJson = ( json: Record<string, any> ): Result<Location, Error[]> => {
  const result = newLocation( {
    id         : json['id'] ?? '',
    name       : json['name'] ?? '',
    countryCode: json['country_code'] ?? '',
    position   : {
      lat: json['position']?.latitude ?? '',
      lng: json['position']?.longitude ?? ''
    }
  } )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}

/**
 * Create a json from location instance
 * @throws {UnknownException} - if unknown error
 */
export const locationToJson = ( location: Location ): Result<Record<string, any>, Error> => {
  try {
    return Ok( {
      id          : location.id.value,
      name        : location.name.value,
      country_code: location.countryCode.value,
      position    : {
        latitude : location.position.lat,
        longitude: location.position.lng
      }
    } )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error location to json' )
    return Err( err )
  }
}
