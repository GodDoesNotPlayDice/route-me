import { Result } from 'oxide.ts'
import {
	newTripDescription,
	TripDescription
} from 'src/package/trip/domain/models/trip-description'
import { FakerDescriptionMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-description-mother'

export  class TripDescriptionMother {

	static random():Result<TripDescription, Error>{
		return newTripDescription({
			value: FakerDescriptionMother.random()
		})
	}

	static invalid():Result<TripDescription, Error>{
		return newTripDescription({
			value: ''+undefined
		})
	}
}
