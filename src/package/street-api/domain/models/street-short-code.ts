import {
  Err,
  Ok,
  Result
} from 'oxide.ts'

import { StreetShortCodeInvalidException } from 'src/package/street-api/domain/exceptions/street-short-code-invalid-exception'
import { z } from 'zod'

export const StreetShortCodeSchema = z.object( {
  value: z.string().min(2).max(2)
} )
type StreetShortCodeType = z.infer<typeof StreetShortCodeSchema>

export interface StreetShortCode extends StreetShortCodeType {}

export interface StreetShortCodeProps {
  value: string
}

/**
 * Create a street name instance
 * @throws {StreetShortCodeInvalidException} - if short code is invalid
 */
export const newStreetShortCode = ( props: StreetShortCodeProps ): Result<StreetShortCode, Error> => {
  const result = StreetShortCodeSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new StreetShortCodeInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
