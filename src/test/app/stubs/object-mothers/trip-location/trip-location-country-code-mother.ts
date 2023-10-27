import { Result } from 'oxide.ts'
import {
	newTripLocationCountryCode,
	TripLocationCountryCode
} from 'src/package/trip-location/domain/models/trip-location-country-code'
import { FakerCountryCodeMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-country-code-mother'

export class TripLocationCountryCodeMother {
	static random(): Result<TripLocationCountryCode, Error> {
		return newTripLocationCountryCode( {
			value: FakerCountryCodeMother.random()
		} )
	}

	static invalid(): Result<TripLocationCountryCode, Error> {
		return newTripLocationCountryCode( {
			value: ''
		} )
	}
}
