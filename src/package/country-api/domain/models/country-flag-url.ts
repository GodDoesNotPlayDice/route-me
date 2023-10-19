import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { CountryFlagInvalidException } from 'src/package/country-api/domain/exceptions/country-flag-invalid-exception'
import { z } from 'zod'

export const CountryFlagUrlSchema = z.object( {
  png: z.string()
        .min( 1 )
} )

type CountryFlagUrlType = z.infer<typeof CountryFlagUrlSchema>

export interface CountryFlagUrl extends CountryFlagUrlType {}

export interface CountryFlagUrlProps {
  png: string
}

/**
 * Create country flag url instance
 * @throws {CountryFlagInvalidException} - if flag is invalid
 */
export const newCountryFlagUrl = ( props: CountryFlagUrlProps ): Result<CountryFlagUrl, Error> => {
  const result = CountryFlagUrlSchema.safeParse( {
    png: props.png
  } )

  if ( !result.success ) {
    return Err( new CountryFlagInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
