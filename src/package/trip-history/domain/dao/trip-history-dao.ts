import { Result } from 'oxide.ts'
import { Email } from 'src/package/shared/domain/models/email'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'

export abstract class TripHistoryDao {
	abstract create( trip: TripHistory ): Promise<Result<boolean, Error[]>>

	abstract getAll( email: Email ): Promise<Result<TripHistory[], Error[]>>
}
