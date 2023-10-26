import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	newValidNumber,
	ValidNumber
} from 'src/package/shared/domain/models/valid-number'
import { FakerNumberIntMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-number-int-mother'

export class ValidNumberMother {
	static random(min?: number, max?: number) :Result<ValidNumber, Error>{
		return newValidNumber({
			value: FakerNumberIntMother.random(min, max)
		})
	}

	static invalid() :Result<ValidNumber, Error>{
		return newValidNumber({
			value: -1
		})
	}
}
