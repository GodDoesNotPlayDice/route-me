import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  Geometry,
  GeometryProps,
  newGeometry
} from 'src/package/direction-api/domain/models/geometry'
import { newDirectionMapBox } from 'src/package/direction-api/infrastructure/mapbox/models/direction-map-box'

export interface Direction {
  coordinates: Geometry
}

export interface DirectionProps {
  coordinates: GeometryProps
}

/**
 * Create direction instance
 * @throws {GeometryInvalidException} - if geometry is invalid
 */
export const newDirectionFromJson = ( json: Record<string, any> ): Result<Direction, Error> => {
  return newDirectionMapBox( json )
}

/**
 * Create direction instance
 * @throws {GeometryInvalidException} - if geometry is invalid
 */
export const newDirection = ( props: DirectionProps ): Result<Direction, Error> => {
  const result = newGeometry( {
    values: props.coordinates.values
  } )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( {
    coordinates: result.unwrap()
  } )
}
