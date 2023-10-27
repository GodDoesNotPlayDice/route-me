import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	newTripState,
	TripStateEnum
} from 'src/package/trip/domain/models/trip-state'

export class TripStateMother {
	static random(): Result<TripStateEnum, Error> {
		return newTripState( {
			value: faker.helpers.enumValue( TripStateEnum )
		} )
	}

	static invalid(): Result<TripStateEnum, Error> {
		return newTripState( {
			value: 'invalid'
		} )
	}
}
