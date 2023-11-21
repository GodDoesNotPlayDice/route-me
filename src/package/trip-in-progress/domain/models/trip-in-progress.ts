import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export interface TripInProgress {
	id: TripID
	startLocation: TripLocation
	endLocation: TripLocation
	status: TripState
	latitude: number
	longitude: number
}
