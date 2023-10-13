import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newRating,
	Rating
} from 'src/package/rating/domain/models/rating'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a rating instance from json
 * @throws {RatingIdInvalidException} - if id is invalid
 * @throws {RatingValueInvalidException} - if value is invalid
 */
export const ratingFromJson = ( json: Record<string, any> ): Result<Rating, Error[]> => {
	const rating = newRating( {
		id   : json['id'],
		value: json['value']
	} )

	if ( rating.isErr() ) {
		return Err( rating.unwrapErr() )
	}

	return Ok( rating.unwrap())
}

/**
 * Create a json from rating instance
 * @throws {UnknownException} - if unknown error
 */
export const ratingToJson = ( rating: Rating ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id   : rating.id.value,
			value: rating.value.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error rating to json' )
		return Err( err )
	}
}
