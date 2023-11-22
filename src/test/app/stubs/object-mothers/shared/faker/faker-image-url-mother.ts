import { faker } from '@faker-js/faker'

export class FakerImageUrlMother {
	static random(): string {
		return faker.image.url()
	}
}
