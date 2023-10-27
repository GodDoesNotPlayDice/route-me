import { faker } from '@faker-js/faker'

export class FakerAvatarMother {
	static random(): string {
		return faker.internet.avatar()
	}
}
