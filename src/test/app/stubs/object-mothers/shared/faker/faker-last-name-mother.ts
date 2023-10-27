import { faker } from '@faker-js/faker'

export class FakerLastNameMother {
	static random(): string {
		return faker.person.lastName()
	}
}
