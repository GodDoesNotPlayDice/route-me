import { Result } from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'

export const createNearTrip = async ( dao: NearTripRepository,
	nearTrip: NearTrip ): Promise<Result<boolean, Error>> => {
	return await dao.create( nearTrip )
}
