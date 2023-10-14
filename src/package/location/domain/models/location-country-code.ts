import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { LocationCountryCodeInvalidException } from 'src/package/location/domain/exception/location-country-code-invalid-exception'
import { z } from 'zod'

export const LocationCountryCodeSchema = z.object( {
  value: z.string()
} )

type LocationCountryCodeType = z.infer<typeof LocationCountryCodeSchema>

export interface LocationCountryCode extends LocationCountryCodeType {}

export interface LocationCountryCodeProps {
  value: string
}

/**
 * Create location country code instance
 * @throws {LocationCountryCodeInvalidException} - if country code is invalid
 */
export const newLocationCountryCode = ( props: LocationCountryCodeProps ): Result<LocationCountryCode, Error> => {
  const result = LocationCountryCodeSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new LocationCountryCodeInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
