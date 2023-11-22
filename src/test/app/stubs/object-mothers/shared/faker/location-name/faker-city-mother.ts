import { faker } from '@faker-js/faker'

export class FakerCityMother {
	static random(): string {
		return faker.location.city()
	}
}
