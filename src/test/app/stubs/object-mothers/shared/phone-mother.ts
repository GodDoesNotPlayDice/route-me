import { Result } from 'oxide.ts'
import {
	newPhone,
	Phone
} from 'src/package/shared/domain/models/phone'
import { FakerNumberTextMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-number-text-mother'

export class PhoneMother {
	static random(): Result<Phone, Error[]> {
		return newPhone( {
			value: FakerNumberTextMother.random( {
				length: {
					min: 8,
					max: 9
				}
			} )
		} )
	}

	static invalid(): Result<Phone, Error[]> {
		return newPhone( {
			value: ''
		} )
	}
}
