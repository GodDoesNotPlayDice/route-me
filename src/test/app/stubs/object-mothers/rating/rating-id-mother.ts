import { Result } from 'oxide.ts'
import {
	newRatingID,
	RatingID
} from 'src/package/rating/domain/models/rating-id'
import { ulid } from 'ulidx'

export class RatingIdMother {
	static random(): Result<RatingID, Error> {
		return newRatingID( {
			value: ulid()
		} )
	}

	static invalid(): Result<RatingID, Error> {
		return newRatingID( {
			value: ''
		} )
	}
}
