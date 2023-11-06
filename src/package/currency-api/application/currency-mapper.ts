import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	CurrencyExchange,
	newCurrencyExchange
} from 'src/package/currency-api/domain/models/currency-exchange'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create currency exchange instance from json
 * @throws {CurrencyInvalidException} - if ip is invalid
 */
export const currencyFromJson = ( value: any ): Result<CurrencyExchange, Error> => {
	const currencyExchange = newCurrencyExchange( {
		value: value
	} )

	if ( currencyExchange.isErr() ) {
		return Err( currencyExchange.unwrapErr() )
	}

	return Ok( currencyExchange.unwrap() )
}

/**
 * Create a json from currency exchange instance
 * @throws {UnknownException} - if unknown error
 */
export const currencyToJson = ( currency: CurrencyExchange ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			value: currency.value
		}

		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error ip to json' )
		return Err( err )
	}
}
