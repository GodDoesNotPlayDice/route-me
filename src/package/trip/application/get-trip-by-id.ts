import { Result } from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const getTripByID = async ( dao: TripDao,
	id: TripID ): Promise<Result<Trip, Error[]>> => {
	return await dao.getById( id )
}
