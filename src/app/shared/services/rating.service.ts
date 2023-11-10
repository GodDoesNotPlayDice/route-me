import { Injectable } from '@angular/core'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { createRating } from 'src/package/rating/application/create-rating'
import { RatingDao } from 'src/package/rating/domain/dao/rating-dao'
import { Email } from 'src/package/shared/domain/models/email'

@Injectable( {
	providedIn: 'root'
} )
export class RatingService {

	constructor(
		private ratingDao: RatingDao
	)
	{ }

	async createRating( props: {
		value: number,
		senderEmail: Email,
		userEmail: Email,
	} ): Promise<Result<boolean, Error[]>> {
		const result = await createRating( this.ratingDao, props )
		if ( result.isErr() ) {
			console.log( 'error. create rating service', result.unwrapErr() )
			return Err( result.unwrapErr() )
		}
		return Ok( true )
	}
}
