import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { TripLocation } from "src/package/trip-location/domain/models/trip-location";
import { PositionMother } from 'src/test/app/stubs/object-mothers/shared/position-mother'
import { TripLocationCountryCodeMother } from 'src/test/app/stubs/object-mothers/trip-location/trip-location-country-code-mother'
import { TripLocationIDMother } from 'src/test/app/stubs/object-mothers/trip-location/trip-location-id-mother'
import { TripLocationNameMother } from 'src/test/app/stubs/object-mothers/trip-location/trip-location-name-mother'

export class TripLocationMother {
	static random(): Result<TripLocation, Error[]>{
		return Ok({
			id: TripLocationIDMother.random().unwrap(),
			name: TripLocationNameMother.random().unwrap(),
			countryCode: TripLocationCountryCodeMother.random().unwrap(),
			position: PositionMother.random().unwrap()
		})
	}

	static invalid(): Result<TripLocation, Error[]> {
		return Err([
			TripLocationIDMother.invalid().unwrapErr(),
			TripLocationNameMother.invalid().unwrapErr(),
			TripLocationCountryCodeMother.invalid().unwrapErr(),
			PositionMother.invalid().unwrapErr(),
		])
	}
}
