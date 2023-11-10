import {
	RatingID,
	RatingIDProps
} from 'src/package/rating/domain/models/rating-id'
import {
	RatingValue,
	RatingValueProps
} from 'src/package/rating/domain/models/rating-value'
import {
	Email,
	EmailProps
} from 'src/package/shared/domain/models/email'

export interface Rating {
	id: RatingID
	value: RatingValue
	senderEmail: Email
	userEmail: Email
}

export interface RatingProps {
	id: RatingIDProps
	value: RatingValueProps
	senderEmail: EmailProps
	userEmail: EmailProps
}
