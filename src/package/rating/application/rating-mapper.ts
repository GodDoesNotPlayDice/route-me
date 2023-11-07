import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Rating } from 'src/package/rating/domain/models/rating'
import { newRatingID } from 'src/package/rating/domain/models/rating-id'
import { newRatingValue } from 'src/package/rating/domain/models/rating-value'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newValidNumber } from 'src/package/shared/domain/models/valid-number'

/**
 * Create a rating instance from json
 * @throws {RatingIdInvalidException} - if id is invalid
 * @throws {RatingValueInvalidException} - if value is invalid
 */
export const ratingFromJson = ( json: Record<string, any> ): Result<Rating, Error[]> => {
	const err: Error[] = []

	const id = newRatingID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const userEmail = newEmail( {
		value: json['user_email'] ?? ''
	} )

	if ( userEmail.isErr() ) {
		err.push( userEmail.unwrapErr() )
	}

	const senderEmail = newEmail( {
		value: json['sender_email'] ?? ''
	} )

	if ( senderEmail.isErr() ) {
		err.push( senderEmail.unwrapErr() )
	}

	const value = newRatingValue( {
		value: json['value'] ?? ''
	} )

	if ( value.isErr() ) {
		err.push( value.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		id         : id.unwrap(),
		value      : value.unwrap(),
		senderEmail: senderEmail.unwrap(),
		userEmail  : userEmail.unwrap()
	} )
}

/**
 * Create a json from rating instance
 * @throws {UnknownException} - if unknown error
 */
export const ratingToJson = ( rating: Rating ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id          : rating.id.value,
			sender_email: rating.senderEmail.value,
			user_email  : rating.userEmail.value,
			value       : rating.value.value
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
