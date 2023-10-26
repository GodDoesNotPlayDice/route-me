import { faker } from '@faker-js/faker'

export class FakerBirthDayMother {
	static random( options?: {
		min?: number;
		max?: number;
		mode?: 'age' | 'year';
	} ): Date {
		return faker.date.birthdate( options )
	}
}
