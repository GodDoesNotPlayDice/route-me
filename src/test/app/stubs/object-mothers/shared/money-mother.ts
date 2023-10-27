import { Result } from 'oxide.ts'
import {
	Money,
	newMoney
} from 'src/package/shared/domain/models/money'
import { FakerMoneyMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-money-mother'

export class MoneyMother {
	static random(): Result<Money, Error> {
		return newMoney( {
			value: FakerMoneyMother.random()
		} )
	}

	static invalid(): Result<Money, Error> {
		return newMoney( {
			value: -1
		} )
	}
}
