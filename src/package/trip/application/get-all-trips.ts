import { Result } from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const getAllTrips = async ( dao: TripDao ): Promise<Result<Trip[], Error[]>> => {
	return await dao.getAll()
}
