import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { CountryNumberCodeInvalidException } from 'src/package/country-api/domain/exceptions/country-number-code-invalid-exception'
import { z } from 'zod'

export const CountryNumberCodeSchema = z.object( {
  root    : z.string().nonempty(),
  suffixes: z.array( z.string() ).nonempty()
} )

type CountryNumberCodeType = z.infer<typeof CountryNumberCodeSchema>

export interface CountryNumberCode extends CountryNumberCodeType {}

export interface CountryNumberCodeProps {
  root: string
  suffixes: string[]
}

/**
 * Create country number code instance
 * @throws {CountryNumberCodeInvalidException} - if number code is invalid
 */
export const newCountryNumberCode = ( props: CountryNumberCodeProps ): Result<CountryNumberCode, Error> => {
  const result = CountryNumberCodeSchema.safeParse( {
    root    : props.root,
    suffixes: props.suffixes
  } )

  if ( !result.success ) {
    return Err( new CountryNumberCodeInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
