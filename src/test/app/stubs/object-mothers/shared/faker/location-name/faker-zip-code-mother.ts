import { faker } from '@faker-js/faker'

export class FakerZipCodeMother {
	static random(): string {
		return faker.location.zipCode()
	}
}
