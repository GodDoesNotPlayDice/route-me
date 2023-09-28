import { TripID } from 'src/package/trip'
import { TripHistoryIDSchema } from 'src/package/trip-history/domain/models/trip-history-id'
import { UserID } from 'src/package/user'
import { z } from 'zod'

export const TripHistorySchema = z.object( {
	id: TripHistoryIDSchema
} )

export interface TripHistory extends z.infer<typeof TripHistorySchema> {
	userID: UserID
	tripID: TripID
}

export interface TripHistoryProps {
	id: string
	userID: UserID
	tripID: TripID
}

export const newTripHistory = ( props: TripHistoryProps ): TripHistory => {
	return {
		id    : TripHistoryIDSchema.parse( {
			value: props.id
		} ),
		userID: props.userID,
		tripID: props.tripID
	}
}

