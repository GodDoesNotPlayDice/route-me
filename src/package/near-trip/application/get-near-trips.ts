import { Result } from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { Position } from 'src/package/position-api/domain/models/position'

export const getNearTrips = async ( dao: NearTripRepository,
	center: Position,
	radiusInKm: number ): Promise<Result<NearTrip[], Error[]>> => {
	return await dao.getNearTrips( center, radiusInKm )
}
