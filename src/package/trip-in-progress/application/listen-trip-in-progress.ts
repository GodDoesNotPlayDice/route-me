import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Observable } from 'rxjs'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { newTripID } from 'src/package/trip/domain/models/trip-id'

export const listenTripInProgress = async ( dao: TripInProgressDao,
	tripID: string ): Promise<Result<Observable<TripInProgress | null>, Error[]>> => {

	const id = newTripID( {
		value: tripID
	} )

	if ( id.isErr() ) {
		return Err( [ id.unwrapErr() ] )
	}

	const result = await dao.listen( id.unwrap() )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
