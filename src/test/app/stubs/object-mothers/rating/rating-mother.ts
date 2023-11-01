import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Rating } from 'src/package/rating/domain/models/rating'
import { RatingValueMother } from 'src/test/app/stubs/object-mothers/rating/rating-value-mother'
import { RatingIdMother } from 'src/test/app/stubs/object-mothers/rating/rating-id-mother'
import { EmailMother } from 'src/test/app/stubs/object-mothers/shared/email-mother'

export class RatingMother {
	static random(): Result<Rating, Error[]> {
		return Ok( {
			id         : RatingIdMother.random()
			                           .unwrap(),
			value      : RatingValueMother.random()
			                              .unwrap(),
			userEmail  : EmailMother.random()
			                        .unwrap(),
			senderEmail: EmailMother.random()
			                        .unwrap()
		} )
	}

	static invalid(): Result<Rating, Error[]> {
		return Err( [
			RatingIdMother.invalid()
			              .unwrapErr(),
			RatingValueMother.invalid()
			                 .unwrapErr(),
			EmailMother.invalid()
			           .unwrapErr(),
			EmailMother.invalid()
			           .unwrapErr()
		] )
	}
}
