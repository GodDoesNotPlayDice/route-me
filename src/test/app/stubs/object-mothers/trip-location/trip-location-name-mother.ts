
import { Result } from 'oxide.ts'
import {
	newTripLocationName,
	TripLocationName
} from 'src/package/trip-location/domain/models/trip-location-name'
import { FakerCountryCodeMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-country-code-mother'
import { FakerAddressMother } from 'src/test/app/stubs/object-mothers/shared/faker/name/faker-address-mother'
import { FakerCountryMother } from 'src/test/app/stubs/object-mothers/shared/faker/name/faker-country-mother'
import { FakerStateMother } from 'src/test/app/stubs/object-mothers/shared/faker/name/faker-state-mother'
import { FakerZipCodeMother } from 'src/test/app/stubs/object-mothers/shared/faker/name/faker-zip-code-mother'
export class TripLocationNameMother {
	static random() :Result<TripLocationName, Error>{
		const address = FakerAddressMother.random()
		const city = FakerCountryCodeMother.random()
		const state = FakerStateMother.random()
		const zip = FakerZipCodeMother.random()
		const country = FakerCountryMother.random()
		const name = `${address}, ${city}, ${state} ${zip}, ${country}`
		return newTripLocationName({
			value: name
		})
	}

	static invalid() :Result<TripLocationName, Error>{
		return newTripLocationName({
			value:''
		})
	}
}
