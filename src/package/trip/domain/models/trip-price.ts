import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Currency,
	newCurrency
} from 'src/package/shared/domain/models/currency'
import {
	Money,
	newMoney
} from 'src/package/shared/domain/models/money'


export interface TripPrice {
	currency: Currency,
	amount: Money,
}

export interface TripPriceProps {
	amount: number,
	currency: string,
}

/**
 * Create a trip price instance
 * @throws {MoneyInvalidException} - if money is invalid
 * @throws {CurrencyInvalidException} - if currency is invalid
 */
export const newTripPrice = ( props: TripPriceProps ): Result<TripPrice, Error[]> => {

	const errors: Error[] = []

	const moneyResult = newMoney( {
		value: props.amount
	} )

	if ( moneyResult.isErr() ) {
		errors.push( moneyResult.unwrapErr() )
	}

	const currencyResult = newCurrency( {
		value: props.currency
	} )

	if ( currencyResult.isErr() ) {
		errors.push( currencyResult.unwrapErr() )
	}

	if ( errors.length > 0 ) {
		return Err( errors )
	}

	return Ok( {
			amount  : moneyResult.unwrap(),
			currency: currencyResult.unwrap()
		}
	)
}
