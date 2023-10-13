import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  LocationCountryCode,
  newLocationCountryCode
} from 'src/package/location/domain/models/location-country-code'
import {
  LocationID,
  newLocationID
} from 'src/package/location/domain/models/location-id'
import {
  LocationName,
  newLocationName
} from 'src/package/location/domain/models/location-name'
import {
  newPosition,
  Position,
  PositionProps
} from 'src/package/position-api/domain/models/position'

export interface Location {
  id: LocationID
  name: LocationName
  countryCode: LocationCountryCode
  position: Position
}

export interface LocationProps {
  id: string
  name: string
  countryCode: string
  position: PositionProps
}

/**
 * Create location instance
 * @throws {LocationIdInvalidException} - if id is invalid
 * @throws {LocationNameInvalidException} - if name is invalid
 * @throws {LocationCountryCodeInvalidException} - if country code is invalid
 * @throws {PositionInvalidException} - if position is invalid
 */
export const newLocation = ( props: LocationProps ): Result<Location, Error[]> => {
  const err: Error[] = []

  const id = newLocationID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const name = newLocationName( {
    value: props.name
  } )

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const countryCode = newLocationCountryCode( {
    value: props.countryCode
  } )

  if ( countryCode.isErr() ) {
    err.push( countryCode.unwrapErr() )
  }

  const position = newPosition( {
    lat: props.position.lat,
    lng: props.position.lng
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
