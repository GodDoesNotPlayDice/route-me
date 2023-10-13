import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { LocationNameInvalidException } from 'src/package/location/domain/exception/location-name-invalid-exception'
import { z } from 'zod'

export const LocationNameSchema = z.object( {
	value: z.string()
} )

type LocationNameType = z.infer<typeof LocationNameSchema>

export interface LocationName extends LocationNameType {}

export interface LocationNameProps {
	value: string
}

/**
 * Create location name instance
 * @throws {LocationNameInvalidException} - if name is invalid
 */
export const newLocationName = ( props: LocationNameProps ): Result<LocationName, Error> => {
	const result = LocationNameSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new LocationNameInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
