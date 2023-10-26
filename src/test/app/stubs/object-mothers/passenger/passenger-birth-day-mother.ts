import { Result } from 'oxide.ts'
import {
	newPassengerBirthDay,
	PassengerBirthDay
} from 'src/package/passenger/domain/models/passenger-birth-day'
import { FakerBirthDayMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-birth-day-mother'

export class PassengerBirthDayMother {
	static random() :Result<PassengerBirthDay, Error>{
		return newPassengerBirthDay({
			value: FakerBirthDayMother.random()
		})
	}

	static invalid() :Result<PassengerBirthDay, Error>{
		return newPassengerBirthDay({
			value: new Date()
		})
	}
}
