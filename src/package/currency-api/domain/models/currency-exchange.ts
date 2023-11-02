import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { CurrencyExchangeInvalidException } from 'src/package/currency-api/domain/exceptions/currency-exchange-invalid-exception'
import { z } from 'zod'

export interface CurrencyExchangeProps {
	value: number;
}

export const CurrencyExchangeSchema = z.object( {
	value        : z.number().nonnegative(),
} )

type CurrencyExchangeType = z.infer<typeof CurrencyExchangeSchema>

export interface CurrencyExchange extends CurrencyExchangeType {}

/**
 * Create currency exchange instance
 * @throws {CurrencyExchangeInvalidException} - if currency exchange is invalid
 */
export const newCurrencyExchange = ( props: CurrencyExchangeProps ): Result<CurrencyExchange, Error> => {
	const result = CurrencyExchangeSchema.safeParse( {
		value: props.value,
	} )

	if ( !result.success ) {
		return Err( new CurrencyExchangeInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
