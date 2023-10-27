import { TripLocationName } from 'src/package/trip-location/domain/models/trip-location-name'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export interface TripHistoryPreview {
	id: TripID
	startLocationName: TripLocationName
	endLocationName: TripLocationName
	startDate: Date
}
