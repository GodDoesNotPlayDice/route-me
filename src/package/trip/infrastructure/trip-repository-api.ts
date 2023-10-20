import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Result
} from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { TripRepository } from 'src/package/trip/domain/repository/trip-repository'

export class TripRepositoryApi implements TripRepository {

	constructor( private http: HttpClient ) {}

	private url = environment.apiUrl

	async calculateTripPrice( start: Position,
		end: Position ): Promise<Result<TripPrice, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

}
