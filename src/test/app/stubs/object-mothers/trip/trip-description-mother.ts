import { Result } from 'oxide.ts'
import {
	newTripDescription,
	TripDescription
} from 'src/package/trip/domain/models/trip-description'
import { FakerProductDescriptionMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-product-description-mother'

export class TripDescriptionMother {

	static random(): Result<TripDescription, Error> {
		return newTripDescription( {
			value: FakerProductDescriptionMother.random()
		} )
	}

	static invalid(): Result<TripDescription, Error> {
		return newTripDescription( {
			value: '' + undefined
		} )
	}
}
