import { Result } from 'oxide.ts'
import {
	newTripDescription,
	TripDescription
} from 'src/package/trip/domain/models/trip-description'
import { FakerBioMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-bio-mother'

export  class TripDescriptionMother {

	static random():Result<TripDescription, Error>{
		return newTripDescription({
			value: FakerBioMother.random()
		})
	}

	static invalid():Result<TripDescription, Error>{
		return newTripDescription({
			value: ''+undefined
		})
	}
}
