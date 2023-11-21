import { faker } from '@faker-js/faker'

export class FakerCountryCodeMother {
	static random(): string {
		return faker.location.countryCode()
	}
}
