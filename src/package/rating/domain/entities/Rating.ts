import { RatingID } from 'src/package/rating/domain/value-objects/RatingID'
import { RatingValue } from 'src/package/rating/domain/value-objects/RatingValue'
import { UserID } from 'src/package/user/domain'

export class Rating {
  private constructor(
    readonly id: RatingID,
    readonly userID: UserID,
    readonly fromUserID: UserID,
    readonly rating: RatingValue
  )
  {}

  static from(
    id: RatingID,
    userID: UserID,
    fromUserID: UserID,
    rating: RatingValue
  ): Rating {
    return new Rating(
      id,
      userID,
      fromUserID,
      rating
    )
  }
}
