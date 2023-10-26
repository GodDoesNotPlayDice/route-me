import { faker } from '@faker-js/faker'

export  class FakerSpecialCharacterSymbolMother {
	static random(length?: number | {
		min: number;
		max: number;
	}): string {
		return faker.string.symbol(length)
	}
}
