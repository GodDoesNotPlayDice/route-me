import { faker } from '@faker-js/faker'

export class FakerParagraphMother {
	static random(): string {
		return faker.lorem.paragraph()
	}
}
