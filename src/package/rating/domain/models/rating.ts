import {
  newRatingID,
  RatingID
} from 'src/package/rating/domain/models/rating-id'
import {
  newRatingValue,
  RatingValue
} from 'src/package/rating/domain/models/rating-value'

export interface Rating {
	id: RatingID,
	value: RatingValue
}

export interface RatingProps {
	id: string
	value: string
}

export const newRating = ( props: RatingProps ): Rating => {
	return {
		id   : newRatingID( {
			value: props.id
		} ),
		value: newRatingValue( {
			value: props.value
		} )
	}
}
