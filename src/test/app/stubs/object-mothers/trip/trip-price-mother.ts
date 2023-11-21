import { Result } from 'oxide.ts'
import {
	newTripPrice,
	TripPrice
} from 'src/package/trip/domain/models/trip-price'
import { FakerCurrencyCodeMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-currency-code-mother'
import { FakerMoneyMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-money-mother'

export class TripPriceMother {
	static random(): Result<TripPrice, Error[]> {
		return newTripPrice( {
			amount  : FakerMoneyMother.random(),
			currency: FakerCurrencyCodeMother.random()
		} )
	}

	static invalid(): Result<TripPrice, Error[]> {
		return newTripPrice( {
			amount  : -1,
			currency: 'INVALID'
		} )
	}
}
