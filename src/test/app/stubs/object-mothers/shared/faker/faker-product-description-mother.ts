import { faker } from '@faker-js/faker'

export class FakerProductDescriptionMother {
	static random( ): string {
		return faker.commerce.productDescription()
	}
}
