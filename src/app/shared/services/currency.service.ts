import { Injectable } from '@angular/core'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { CurrencyDao } from 'src/package/currency-api/domain/dao/currency-dao'
import { IpDao } from 'src/package/ip-api/domain/dao/ip-dao'

@Injectable( {
	providedIn: 'root'
} )
export class CurrencyService {

	constructor(
		private ipDao: IpDao,
		private currencyDao: CurrencyDao
	)
	{ }

	async fetchCurrency(): Promise<Result<CurrencyValue, Error>>
	{
		const resultIP = await this.ipDao.getIp()

		if ( resultIP.isErr() ) {
			return Err( resultIP.unwrapErr() )
		}
		const resultCurrency = await this.currencyDao.getCurrencyExchange(
			'USD',
			resultIP.unwrap().currency
		)

		if ( resultCurrency.isErr() ) {
			return Err( resultCurrency.unwrapErr() )
		}

		return Ok( {
				value   : resultCurrency.unwrap().value,
				lang    : resultIP.unwrap().languages[0],
				currency: resultIP.unwrap().currency
			}
		)
	}

	parseCurrency( value: number, props: CurrencyValue ): string
	{
		const targetValue = value * props.value
		return new Intl.NumberFormat(
			props.lang, {
				style   : 'currency',
				currency: props.currency
			} ).format( targetValue )
	}
}

export interface CurrencyValue {
	value: number,
	currency: string,
	lang: string
}
