import { Result } from 'oxide.ts'
import { Rating } from 'src/package/rating/domain/models/rating'
import { RatingID } from 'src/package/rating/domain/models/rating-id'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class RatingDao {
	abstract create( rating: Rating ): Promise<Result<boolean, Error[]>>

	abstract delete( id: RatingID ): Promise<Result<boolean, Error[]>>

	abstract getByEmail( email: Email ): Promise<Result<Rating[], Error[]>>
}
