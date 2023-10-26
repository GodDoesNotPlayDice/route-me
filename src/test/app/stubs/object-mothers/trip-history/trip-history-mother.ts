import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripHistory } from 'src/package/trip-history/domain/models/trip-history'
import { TripHistoryIDMother } from 'src/test/app/stubs/object-mothers/trip-history/trip-history-id-mother'
import { TripMother } from 'src/test/app/stubs/object-mothers/trip/trip-mother'

export class TripHistoryMother {
	static random() :Result<TripHistory, Error[]>{
		const trips = faker.helpers.multiple(() => TripMother.random().unwrap())
		return Ok({
			id: TripHistoryIDMother.random().unwrap(),
			trips: trips
		})
	}

	static invalid() :Result<TripHistory, Error[]>{
		const tripsErrs = faker.helpers.multiple(() => TripMother.invalid().unwrapErr())
		return Err([
			TripHistoryIDMother.invalid().unwrapErr(),
			...tripsErrs.flat()
		])
	}
}

