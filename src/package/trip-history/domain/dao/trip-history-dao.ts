import { Result } from 'oxide.ts'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'
import { TripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'

export abstract class TripHistoryDao {
  abstract create( trip: TripHistory ): Promise<Result<boolean, Error[]>>

  abstract getById( id: TripHistoryID ): Promise<Result<TripHistory, Error[]>>

  abstract getAll(): Promise<Result<TripHistory[], Error[]>>
}
