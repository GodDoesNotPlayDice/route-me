import {
	RatingID,
	RatingIDProps
} from 'src/package/rating/domain/models/rating-id'
import {
	Email,
	EmailProps
} from 'src/package/shared/domain/models/email'
import {
	ValidNumber,
	ValidNumberProps
} from 'src/package/shared/domain/models/valid-number'

export interface Rating {
	id: RatingID
	value: ValidNumber
	senderEmail: Email
	userEmail: Email
}

export class RatingProps {
	id: RatingIDProps
	value: ValidNumberProps
	senderEmail: EmailProps
	userEmail: EmailProps
}
