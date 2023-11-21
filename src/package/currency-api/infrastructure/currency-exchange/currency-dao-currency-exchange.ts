import { HttpClient } from '@angular/common/http'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { currencyFromJson } from 'src/package/currency-api/application/currency-mapper'
import { CurrencyDao } from 'src/package/currency-api/domain/dao/currency-dao'
import { CurrencyExchange } from 'src/package/currency-api/domain/models/currency-exchange'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class CurrencyDaoCurrencyExchange implements CurrencyDao {
	constructor( private http: HttpClient ) {}

	readonly url = 'https://currency-exchange.p.rapidapi.com/exchange'

	async getCurrencyExchange( from: string,
		to: string ): Promise<Result<CurrencyExchange, Error>> {
		const response = await this.http.get( this.url, {
			params : {
				from: from,
				to  : to
			},
			headers: {
				'X-RapidAPI-Key' : '447800c911msha0ff3254fa4c25cp1da8f3jsn6fb0775a4187',
				'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
			}
		} )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( new UnknownException(
				'currency exchange dao. get currency exchange. currency exchange' ) )
		}

		const currency = currencyFromJson( response )

		if ( currency.isErr() ) {
			return Err( currency.unwrapErr() )
		}

		return Ok( currency.unwrap() )
	}

}
