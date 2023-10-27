import { faker } from '@faker-js/faker'

export class FakerNumberIntMother {
	/**
	 * Random number between min and max
	 */
	static random( min?: number, max?: number ): number {
		return faker.number.int( {
			min: min,
			max: max
		} )
	}
}
