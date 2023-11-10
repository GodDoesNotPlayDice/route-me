import { Result } from 'oxide.ts'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const deleteNearTrip = async ( dao: NearTripRepository,
	id: TripID ): Promise<Result<boolean, Error>> => {
	return await dao.delete( id )
}
