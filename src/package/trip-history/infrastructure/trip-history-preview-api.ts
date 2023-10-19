import {
  Err,
  Result
} from 'oxide.ts'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import { TripHistoryPreviewDao } from 'src/package/trip-history/domain/dao/trip-history-preview-dao'
import { TripHistoryPreview } from 'src/package/trip-history/domain/models/trip-history-preview'

export class TripHistoryApi implements TripHistoryPreviewDao {
  /**
   * Get all trip history previews
   * @throws {ApiOperationException} - if api operation failed
   */
  async getAll(): Promise<Result<TripHistoryPreview[], Error[]>> {
    return Err( [ new ApiOperationException() ] )
  }
}
