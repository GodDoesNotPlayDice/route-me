import { Injectable } from '@angular/core'
import { Result } from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { TripHistoryDao } from 'src/package/trip-history/domain/dao/trip-history-dao'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'

@Injectable( {
	providedIn: 'root'
} )
export class TripHistoryService {

	constructor(
		private tripHistoryDao: TripHistoryDao
	)
	{ }

	async create( trip: TripHistory ): Promise<Result<boolean, Error[]>> {
		return await this.tripHistoryDao.create( trip )
	}

	async getAll( email: Email ): Promise<Result<TripHistory[], Error[]>> {
		return await this.tripHistoryDao.getAll( email )
	}
}
