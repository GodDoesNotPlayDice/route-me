import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	newTripFeeMethod,
	TripFeeMethod,
	TripFeeMethodEnum
} from 'src/package/trip/domain/models/trip-fee-method'

export class TripFeeMethodMother {

	static random(): Result<TripFeeMethod, Error> {
		return newTripFeeMethod( {
			value: faker.helpers.enumValue( TripFeeMethodEnum )
		} )
	}

	static invalid(): Result<TripFeeMethod, Error> {
		return newTripFeeMethod( {
			value: ''
		} )
	}
}
