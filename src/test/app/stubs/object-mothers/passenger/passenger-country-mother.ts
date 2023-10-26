import { Result } from 'oxide.ts'
import {
	newPassengerCountry,
	PassengerCountry
} from 'src/package/passenger/domain/models/passenger-country'
import { FakerCountryCodeMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-country-code-mother'

export class PassengerCountryMother {

	static random(): Result<PassengerCountry, Error> {
		return newPassengerCountry({
			value: FakerCountryCodeMother.random()
		})
	}

	static invalid(): Result<PassengerCountry, Error> {
		return newPassengerCountry({
			value: ''
		})
	}
}
