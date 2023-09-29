import { TripID } from 'src/package/trip'
import {
  newTripHistoryID,
  TripHistoryID
} from 'src/package/trip-history/domain/models/trip-history-id'
import { UserID } from 'src/package/user'

export interface TripHistory {
  id: TripHistoryID
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
		id    : newTripHistoryID({
      value: props.id
    }),
		userID: props.userID,
		tripID: props.tripID
	}
}

