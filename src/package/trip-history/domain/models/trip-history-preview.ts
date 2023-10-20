import { LocationName } from 'src/package/location/domain/models/location-name'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export interface TripHistoryPreview {
  id: TripID
  startLocationName: LocationName
  endLocationName: LocationName
  startDate: Date
}
