import { Result } from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { Position } from 'src/package/position-api/domain/models/position'

export abstract class NearTripRepository {
  abstract getNearTrips( center: Position,
    radius: number ): Promise<Result<NearTrip[], Error[]>>
}
