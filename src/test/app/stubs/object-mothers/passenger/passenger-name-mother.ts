import { Result } from 'oxide.ts'
import {
	newPassengerName,
	PassengerName
} from 'src/package/passenger/domain/models/passenger-name'
import { FakerFirstNameMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-first-name-mother'

export class PassengerNameMother {
	static random() :Result<PassengerName, Error>{
		return newPassengerName({
			value: FakerFirstNameMother.random()
		})
	}

	static invalid() :Result<PassengerName, Error>{
		return newPassengerName({
			value:''
		})
	}
}
