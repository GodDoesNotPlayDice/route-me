import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const getTripInProgressById = async ( dao: TripInProgressDao,
	id: TripID ): Promise<Result<TripInProgress, Error[]>> => {

	const result = await dao.getByID( id)

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
