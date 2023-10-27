import { faker } from '@faker-js/faker'

export class FakerBioMother {
	static random(): string {
		return faker.person.bio()
	}
}
