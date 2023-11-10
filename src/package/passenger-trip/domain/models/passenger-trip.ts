import { Email } from 'src/package/shared/domain/models/email'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export interface PassengerTrip {
	tripID: TripID
	userEmail: Email
	state: TripState
}
