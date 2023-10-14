import {
  Err,
  Result
} from 'oxide.ts'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import { TripHistoryDao } from 'src/package/trip-history/domain/dao/trip-history-dao'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'
import { TripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'

export class TripHistoryApi implements TripHistoryDao {
  /**
   * Create trip history
   * @throws {ApiOperationException} - if api operation failed
   */
  async create( trip: TripHistory ): Promise<Result<TripHistory, Error>> {
    return Err( new ApiOperationException() )
  }

  /**
   * Delete trip history
   @throws {ApiOperationException} - if api operation failed
   */
  async delete( id: TripHistoryID ): Promise<Result<boolean, Error>> {
    return Err( new ApiOperationException() )
  }

  /**
   * Get all trip history
   @throws {ApiOperationException} - if api operation failed
   */
  async getAll(): Promise<Result<TripHistory[], Error[]>> {
    return Err( [ new ApiOperationException() ] )
  }

  /**
   * Get by id trip history
   @throws {ApiOperationException} - if api operation failed
   */
  async getById( id: TripHistoryID ): Promise<Result<TripHistory, Error[]>> {
    return Err( [ new ApiOperationException() ] )
  }

  /**
   * Update trip history
   @throws {ApiOperationException} - if api operation failed
   */
  async update( trip: TripHistory ): Promise<Result<boolean, Error>> {
    return Err( new ApiOperationException() )
  }

}
