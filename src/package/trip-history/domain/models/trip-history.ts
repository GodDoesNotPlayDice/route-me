import { Email } from 'src/package/shared/domain/models/email'
import { TripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'
import { Trip } from 'src/package/trip/domain/models/trip'

export interface TripHistory {
	id: TripHistoryID
	userEmail: Email
	trip: Trip
}
