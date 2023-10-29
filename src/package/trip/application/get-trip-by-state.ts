import { Result } from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export const getAllByState = async ( dao: TripDao,
	state: TripState ): Promise<Result<Trip[], Error[]>> => {
	return await dao.getAllByState( state )
}
