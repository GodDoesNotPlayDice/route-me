import { Injectable } from '@angular/core';
import {
	Ok,
	Result
} from 'oxide.ts'
import { createRating } from 'src/package/rating/application/create-rating'
import { RatingDao } from 'src/package/rating/domain/dao/rating-dao'
import { Email } from 'src/package/shared/domain/models/email'

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
		private ratingDao:RatingDao
  ) { }
	//TODO: ReportModal?

	async createRating( props: {
		value: number,
		senderEmail : Email,
		userEmail : Email,
	} ): Promise<Result<boolean, Error[]>> {
		const result = await createRating(this.ratingDao, props)
		return Ok(true)
	}
}
