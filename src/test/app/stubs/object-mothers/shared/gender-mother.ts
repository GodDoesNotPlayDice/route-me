import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	GenderEnum,
	newGender
} from 'src/package/shared/domain/models/gender'

export class GenderMother {
	static random(): Result<GenderEnum, Error> {
		return newGender( {
			value: faker.helpers.enumValue( GenderEnum )
		} )
	}

	static invalid(): Result<GenderEnum, Error> {
		return newGender( {
			value: 'invalid'
		} )
	}
}
