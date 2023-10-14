import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { newPosition } from 'src/package/position-api/domain/models/position'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Street } from 'src/package/street-api/domain/models/street'
import { newStreetName } from 'src/package/street-api/domain/models/street-name'
import { newStreetPlace } from 'src/package/street-api/domain/models/street-place'
import {
  StreetsData
} from 'src/package/street-api/domain/models/streets-data'

/**
 * Create a street instance from json
 * @throws {StreetNameInvalidException} - if some name is invalid
 * @throws {StreetPlaceInvalidException} - if some place is invalid
 * @throws {PositionInvalidException} - if some position is invalid
 */
export const streetsDataFromJson = ( json: Record<string, any> ): Result<StreetsData, Error[]> => {
  const err: Error[]   = []

  const streets : Street[] = []
  for ( const value of Object.values( json['features'] ) ) {
    const entry = value as Record<string, any>

    const positionResult = newPosition( {
      lat: entry['center'][1],
      lng: entry['center'][0]
    } )

    if ( positionResult.isErr() ) {
      err.push( positionResult.unwrapErr() )
    }

    const place = newStreetPlace( {
      value: entry['place_name'] ?? ''
    } )

    if ( place.isErr() ) {
      err.push( place.unwrapErr() )
    }

    const name = newStreetName( {
      value: entry['text'] ?? ''
    } )

    if ( name.isErr() ) {
      err.push( name.unwrapErr() )
    }

    if ( err.length > 0 ) {
      break
    }

    streets.push( {
      center: positionResult.unwrap(),
      place : place.unwrap(),
      name  : name.unwrap()
    } )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
    streets: streets
  } )
}

/**
 * Create a json from street instance
 * @throws {UnknownException} - if unknown error
 */
export const streetToJson = ( street: Street ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      center: {
        lat: street.center.lat,
        lng: street.center.lng
      },
      place : street.place.value,
      name  : street.name.value
    }
    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error street to json' )
    return Err( err )
  }
}
