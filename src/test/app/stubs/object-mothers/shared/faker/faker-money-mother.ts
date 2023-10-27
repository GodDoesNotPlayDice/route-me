import { faker } from '@faker-js/faker'

export class FakerMoneyMother {
	static random(): number {
		return Number( faker.finance.amount() )
	}
}
