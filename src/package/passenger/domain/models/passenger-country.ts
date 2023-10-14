import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerCountryInvalidException } from 'src/package/passenger/domain/exceptions/passenger-country-invalid-exception'
import { z } from 'zod'

export const PassengerCountrySchema = z.object( {
  value: z.string()
} )

type PassengerCountryType = z.infer<typeof PassengerCountrySchema>

export interface PassengerCountry extends PassengerCountryType {}

export interface PassengerCountryProps {
  value: string
}

/**
 * Create a passenger country instance
 * @throws {PassengerCountryInvalidException} - if country is invalid
 */
export const newPassengerCountry = ( props: PassengerCountryProps ): Result<PassengerCountry, Error> => {
  const result = PassengerCountrySchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PassengerCountryInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
