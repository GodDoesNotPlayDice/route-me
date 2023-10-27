import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Currency } from 'src/package/shared/domain/models/currency'
import { ValidNumber } from 'src/package/shared/domain/models/valid-number'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import {
	newTripPrice,
	TripPrice
} from 'src/package/trip/domain/models/trip-price'
import { TripRepository } from 'src/package/trip/domain/repository/trip-repository'

export class TripRepositoryApi implements TripRepository {

	constructor( private http: HttpClient ) {}

	private url = `${ environment.apiUrl }/trip`

	async calculateTripPrice( distance: ValidNumber,
		currency: Currency ): Promise<Result<TripPrice, Error[]>> {
		const response = await this.http.get( `${ this.url }/price`, {
			params : {
				distance: distance.value,
				currency: currency.value
			},
			headers: {
				'Content-Type': 'application/json'
			}
		} )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( [ new ApiOperationException( 'trip price api' ) ] )
		}


		const json      = response as Record<string, any>
		const tripPrice = newTripPrice( {
			amount  : json['amount'] ?? -1,
			currency: json['currency'] ?? ''
		} )

		if ( tripPrice.isErr() ) {
			return Err( tripPrice.unwrapErr() )
		}

		return Ok( tripPrice.unwrap() )
	}

}
