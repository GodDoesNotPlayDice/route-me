import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { LocationIdInvalidException } from 'src/package/location/domain/exception/location-id-invalid-exception'
import { z } from 'zod'

export const LocationIDSchema = z.object( {
  value: z.string()
          .nonempty()
} )

type LocationIDType = z.infer<typeof LocationIDSchema>

export interface LocationID extends LocationIDType {}

export interface LocationIDProps {
  value: string
}

/**
 * Create location id instance
 * @throws {LocationIdInvalidException} - if id is invalid
 */
export const newLocationID = ( props: LocationIDProps ): Result<LocationID, Error> => {
  const result = LocationIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new LocationIdInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
