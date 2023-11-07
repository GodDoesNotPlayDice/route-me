import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export const upsertTripInProgress = async ( dao: TripInProgressDao,
	props: {
		id: TripID
		startLocation: TripLocation
		endLocation: TripLocation
		status: TripState
		latitude: number
		longitude: number
	} ): Promise<Result<TripInProgress, Error[]>> => {

	const newTrip: TripInProgress = {
		id           : props.id,
		status       : props.status,
		latitude     : props.latitude,
		longitude    : props.longitude,
		startLocation: props.startLocation,
		endLocation  : props.endLocation,
	}

	const result = await dao.upsert( newTrip )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( newTrip )
}
