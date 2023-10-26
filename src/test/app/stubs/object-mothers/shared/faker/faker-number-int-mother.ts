import { faker } from '@faker-js/faker'

export  class FakerNumberIntMother{
	static random(min?: number, max?: number): number {
		return faker.number.int({
			min: min,
			max: max
		})
	}
}
