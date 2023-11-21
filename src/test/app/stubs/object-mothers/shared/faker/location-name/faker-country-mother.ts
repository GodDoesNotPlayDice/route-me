import { faker } from '@faker-js/faker'

export class FakerCountryMother {
	static random(): string {
		return faker.location.country()
	}
}
