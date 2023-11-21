import { faker } from '@faker-js/faker'

export class FakerCurrencyCodeMother {
	static random(): string {
		return faker.finance.currencyCode()
	}
}
