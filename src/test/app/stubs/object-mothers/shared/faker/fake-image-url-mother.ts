import { faker } from "@faker-js/faker";

export class FakeImageUrlMother {
	static random(): string {
		return faker.image.url()
	}
}
