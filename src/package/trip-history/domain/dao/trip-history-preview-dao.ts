import { Result } from 'oxide.ts'
import { TripHistoryPreview } from 'src/package/trip-history/domain/models/trip-history-preview'

export abstract class TripHistoryPreviewDao {
  abstract getAll(): Promise<Result<TripHistoryPreview[], Error[]>>
}
