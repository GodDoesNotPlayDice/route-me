import { Result } from 'oxide.ts'
import {
	newRatingValue,
	RatingValue
} from 'src/package/rating/domain/models/rating-value'
import { ValidNumberMother } from 'src/test/app/stubs/object-mothers/shared/valid-number-mother'

export class RatingValueMother {
	static random(): Result<RatingValue, Error> {
		return newRatingValue( {
			value: ValidNumberMother.random( 1, 5 )
			                        .unwrap().value
		} )
	}

	static invalid(): Result<RatingValue, Error> {
		return newRatingValue( {
			value: -1
		} )
	}
}
