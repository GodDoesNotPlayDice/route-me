import { Result } from 'oxide.ts'
import {
	newPassengerDescription,
	PassengerDescription
} from 'src/package/passenger/domain/models/passenger-description'
import { FakerBioMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-bio-mother'

export class PassengerDescriptionMother {

	static random(): Result<PassengerDescription, Error> {
		return newPassengerDescription( {
			value: FakerBioMother.random()
		} )
	}

	static invalid(): Result<PassengerDescription, Error> {
		return newPassengerDescription( {
			value: undefined + ''
		} )
	}
}
