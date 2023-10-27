import { faker } from '@faker-js/faker'

export class FakerPhoneMother {
	static random(): string {
		return faker.phone.number()
	}
}
