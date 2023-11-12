import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { PositionMother } from 'src/test/app/stubs/object-mothers/shared/position-mother'
import { TripLocationMother } from 'src/test/app/stubs/object-mothers/trip-location/trip-location-mother'
import { TripIDMother } from 'src/test/app/stubs/object-mothers/trip/trip-id-mother'
import { TripMother } from 'src/test/app/stubs/object-mothers/trip/trip-mother'
import { TripStateMother } from 'src/test/app/stubs/object-mothers/trip/trip-state-mother'

export class TripInProgressMother {
	static random( radiusInKm: number ): Result<TripInProgress, Error[]> {
		const trip = TripMother.random( radiusInKm )
		                       .unwrap()

		return Ok( {
			id           : trip.id,
			endLocation  : trip.endLocation,
			startLocation: trip.startLocation,
			longitude    : trip.startLocation.position.lng,
			latitude     : trip.startLocation.position.lat,
			status       : trip.state
		} )
	}

	static invalid(): Result<TripInProgress, Error[]> {
		return Err( [
			TripIDMother.invalid()
			            .unwrapErr(),
			...TripLocationMother.invalid()
			                     .unwrapErr(),
			...TripLocationMother.invalid()
			                     .unwrapErr(),
			PositionMother.invalid()
			              .unwrapErr(),
			TripStateMother.invalid()
			               .unwrapErr()
		] )
	}
}
