import {
	faker
} from '@faker-js/faker'

export  class FakerAlphanumericMother {
	static random(options?: number | {
		length?: number | {
			min: number;
			max: number;
		};
		casing?: 'lower' | 'upper' | 'mixed';
	}): string {
		return faker.string.alphanumeric(options)
	}
}
