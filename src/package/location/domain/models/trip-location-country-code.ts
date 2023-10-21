import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripLocationCountryCodeInvalidException } from 'src/package/location/domain/exception/trip-location-country-code-invalid-exception'
import { z } from 'zod'

export const TripLocationCountryCodeSchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type TripLocationCountryCodeType = z.infer<typeof TripLocationCountryCodeSchema>

export interface TripLocationCountryCode extends TripLocationCountryCodeType {}

export interface TripLocationCountryCodeProps {
  value: string
}

/**
 * Create location country code instance
 * @throws {TripLocationCountryCodeInvalidException} - if country code is invalid
 */
export const newTripLocationCountryCode = ( props: TripLocationCountryCodeProps ): Result<TripLocationCountryCode, Error> => {
  const result = TripLocationCountryCodeSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new TripLocationCountryCodeInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
