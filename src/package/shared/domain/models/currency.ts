import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { CurrencyInvalidException } from 'src/package/shared/domain/exceptions/currency-invalid-exception'
import { z } from 'zod'

export const CurrencySchema = z.object( {
  value: z.string()
          .nonempty()
          .max( 3 )
} )

type CurrencyType = z.infer<typeof CurrencySchema>

export interface Currency extends CurrencyType {}

interface CurrencyProps {
  value: string
}

/**
 * Create a currency instance
 * @throws {CurrencyInvalidException} - if currency is invalid
 */
export const newCurrency = ( props: CurrencyProps ): Result<Currency, Error> => {
  const result = CurrencySchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new CurrencyInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
