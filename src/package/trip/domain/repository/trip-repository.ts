import { Result } from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'

export abstract class TripRepository {
  abstract calculateTripPrice( start: Position,
    end: Position ): Promise<Result<TripPrice, Error[]>>
}
