import { Result } from 'oxide.ts'
import {
	newPassengerLastName,
	PassengerLastName
} from 'src/package/passenger/domain/models/passenger-last-name'
import { FakerLastNameMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-last-name-mother'

export class PassengerLastNameMother {
	static random(): Result<PassengerLastName, Error> {
		return newPassengerLastName( {
			value: FakerLastNameMother.random()
		} )
	}

	static invalid(): Result<PassengerLastName, Error> {
		return newPassengerLastName( {
			value: ''
		} )
	}
}
