import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const deleteTripInProgress = async ( dao: TripInProgressDao,
	id: TripID ): Promise<Result<boolean, Error[]>> => {

	const result = await dao.delete( id )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
