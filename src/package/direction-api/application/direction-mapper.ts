import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Direction } from 'src/package/direction-api/domain/models/direction'
import { newGeometry } from 'src/package/direction-api/domain/models/geometry'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newValidNumber } from 'src/package/shared/domain/models/valid-number'

/**
 * Create a direction instance from json
 * @throws {GeometryInvalidException} - if geometry is invalid
 */
export const directionFromJson = ( json: Record<string, any> ): Result<Direction, Error[]> => {
	const err : Error[] = []

	const distance = newValidNumber({
		value: json['routes'][0]?.distance ?? -1
	})

  const geometry = newGeometry( {
    values: json['routes'][0]?.geometry?.coordinates ?? []
  } )

  if ( geometry.isErr() ) {
    err.push(geometry.unwrapErr())
  }

	if ( distance.isErr() ) {
		err.push(distance.unwrapErr())
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

  return Ok( {
    coordinates: geometry.unwrap(),
	  distance: distance.unwrap()
  } )
}

/**
 * Create a json from direction instance
 * @throws {UnknownException} - if unknown error
 */
export const directionToJson = ( direction: Direction ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      coordinates: direction.coordinates.values
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error direction to json' )
    return Err( err )
  }
}
