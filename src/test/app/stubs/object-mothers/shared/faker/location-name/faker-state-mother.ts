import { faker } from '@faker-js/faker'

export class FakerStateMother {
	static random(): string {
		return faker.location.state()
	}
}
