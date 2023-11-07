import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export const upsertTripInProgress = async ( dao: TripInProgressDao,
	trip: TripInProgress, props: {
		startLocation?: TripLocation
		endLocation?: TripLocation
		status?: TripState
		latitude?: number
		longitude?: number
	} ): Promise<Result<TripInProgress, Error[]>> => {

	const newTrip: TripInProgress = {
		id           : trip.id,
		status       : props.status ?? trip.status,
		latitude     : props.latitude ?? trip.latitude,
		longitude    : props.longitude ?? trip.longitude,
		startLocation: props.startLocation ?? trip.startLocation,
		endLocation  : props.endLocation ?? trip.endLocation
	}

	const result = await dao.upsert( newTrip )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( newTrip )
}
