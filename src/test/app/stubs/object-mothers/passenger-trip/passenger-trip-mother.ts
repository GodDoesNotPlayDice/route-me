import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PassengerTrip } from 'src/package/passenger-trip/domain/models/passenger-trip'
import { Trip } from 'src/package/trip/domain/models/trip'
import { EmailMother } from 'src/test/app/stubs/object-mothers/shared/email-mother'
import { TripIDMother } from 'src/test/app/stubs/object-mothers/trip/trip-id-mother'
import { TripStateMother } from 'src/test/app/stubs/object-mothers/trip/trip-state-mother'

export class PassengerTripMother {
	static random( randomTrip: Trip ): Result<PassengerTrip, Error[]> {
		return Ok( {
			tripID   : randomTrip.id,
			state    : randomTrip.state,
			userEmail: faker.helpers.arrayElement( randomTrip.passengers ).email
		} )
	}

	static invalid(): Result<PassengerTrip, Error[]> {
		return Err( [
			TripIDMother.invalid()
			            .unwrapErr(),
			TripStateMother.invalid()
			               .unwrapErr(),
			EmailMother.invalid()
			           .unwrapErr()
		] )
	}
}
