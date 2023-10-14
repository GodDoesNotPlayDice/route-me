import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Location } from 'src/package/location/domain/models/location'
import { newLocationCountryCode } from 'src/package/location/domain/models/location-country-code'
import { newLocationID } from 'src/package/location/domain/models/location-id'
import { newLocationName } from 'src/package/location/domain/models/location-name'
import { newPosition } from 'src/package/position-api/domain/models/position'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a location instance from json
 * @throws {LocationIdInvalidException} - if id is invalid
 * @throws {LocationNameInvalidException} - if name is invalid
 * @throws {LocationCountryCodeInvalidException} - if country code is invalid
 * @throws {PositionInvalidException} - if position is invalid
 */
export const locationFromJson = ( json: Record<string, any> ): Result<Location, Error[]> => {
  const err: Error[] = []

  const id = newLocationID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const name = newLocationName( {
    value: json['name'] ?? ''
  } )

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const countryCode = newLocationCountryCode( {
    value: json['countryCode'] ?? ''
  } )

  if ( countryCode.isErr() ) {
    err.push( countryCode.unwrapErr() )
  }

  //TODO: revisar si pasa json sin verificar undefined
  const position = newPosition( {
    lat: json['position']['latitude'] ?? '',
    lng: json['position']['longitude'] ?? ''
  } )

  if ( position.isErr() ) {
    err.push( position.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    id         : id.unwrap(),
    name       : name.unwrap(),
    countryCode: countryCode.unwrap(),
    position   : position.unwrap()
  } )
}

/**
 * Create a json from location instance
 * @throws {UnknownException} - if unknown error
 */
export const locationToJson = ( location: Location ): Result<Record<string, any>, Error> => {
  try {
    return Ok( {
      id         : location.id.value,
      name       : location.name.value,
      countryCode: location.countryCode.value,
      position   : {
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
