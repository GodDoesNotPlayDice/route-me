import { Result } from 'oxide.ts'
import {
	Currency,
	newCurrency
} from 'src/package/shared/domain/models/currency'
import { FakerCurrencyCodeMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-currency-code-mother'

export class CurrencyMother {
	static random(): Result<Currency, Error> {
		return newCurrency( {
			value: FakerCurrencyCodeMother.random()
		} )
	}

	static invalid(): Result<Currency, Error> {
		return newCurrency( {
			value: 'INVALID'
		} )
	}
}
