import { RatingID } from 'src/package/rating/domain/models/rating-id'
import { RatingValue } from 'src/package/rating/domain/models/rating-value'

export interface Rating {
  id: RatingID,
  value: RatingValue
}
