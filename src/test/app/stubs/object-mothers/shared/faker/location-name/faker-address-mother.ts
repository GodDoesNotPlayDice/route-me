import { faker } from '@faker-js/faker'

export class FakerAddressMother {
	static random(): string {
		return faker.location.streetAddress()
	}
}
