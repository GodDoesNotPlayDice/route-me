import { Result } from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { Position } from 'src/package/position-api/domain/models/position'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export abstract class NearTripRepository {
	abstract getNearTrips( center: Position,
		radiusInKm: number ): Promise<Result<NearTrip[], Error[]>>

	abstract create( nearTrip: NearTrip ): Promise<Result<boolean, Error>>

	abstract update( nearTrip: NearTrip ): Promise<Result<boolean, Error>>

	abstract delete( id: TripID ): Promise<Result<boolean, Error>>
}
