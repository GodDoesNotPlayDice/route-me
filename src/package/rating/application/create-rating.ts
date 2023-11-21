import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { RatingDao } from 'src/package/rating/domain/dao/rating-dao'
import { Rating } from 'src/package/rating/domain/models/rating'
import { newRatingID } from 'src/package/rating/domain/models/rating-id'
import {
	newRatingValue,
	RatingValue
} from 'src/package/rating/domain/models/rating-value'
import { Email } from 'src/package/shared/domain/models/email'
import { ulid } from 'ulidx'

/**
 * Create Driver
 */
export const createRating = async ( dao: RatingDao,
	props: {
		value: number,
		senderEmail: Email,
		userEmail: Email,
	}
): Promise<Result<RatingValue, Error[]>> => {
	const error: Error[] = []

	const id = newRatingID( {
		value: ulid()
	} )

	if ( id.isErr() ) {
		error.push( id.unwrapErr() )
	}

	const value = newRatingValue( {
		value: props.value
	} )

	if ( value.isErr() ) {
		error.push( value.unwrapErr() )
	}

	if ( error.length > 0 ) {
		return Err( error )
	}

	const rating: Rating = {
		id         : id.unwrap(),
		senderEmail: props.senderEmail,
		userEmail  : props.userEmail,
		value      : value.unwrap()
	}

	const result = await dao.create( rating )

	if ( result.isErr() ) {
		error.push( ...result.unwrapErr() )
		return Err( error )
	}

	const values = await dao.getByEmail( rating.userEmail )

	if ( values.isErr() ) {
		error.push( ...values.unwrapErr() )
		return Err( error )
	}

	const sum = values.unwrap()
	                  .reduce( ( acc, curr ) => acc + curr.value.value, 0 )

	const driverRating = sum / values.unwrap().length

	const valueResult = newRatingValue( {
		value: driverRating
	} )

	if ( valueResult.isErr() ) {
		error.push( valueResult.unwrapErr() )
		return Err( error )
	}

	return Ok( valueResult.unwrap() )
}
