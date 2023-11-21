import { faker } from '@faker-js/faker'

export class FakerIpMother {
	static random(): string {
		return faker.internet.ip()
	}
}
