import { Result } from 'oxide.ts'
import {
	newPhone,
	Phone
} from 'src/package/shared/domain/models/phone'
import { FakerPhoneMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-phone-mother'

export class PhoneMother {
	static random(): Result<Phone, Error[]> {
		return newPhone({
			value: FakerPhoneMother.random().replace(/-/g, '')
		})
	}

	static invalid(): Result<Phone, Error[]> {
		return newPhone({
			value: ''
		})
	}
}
