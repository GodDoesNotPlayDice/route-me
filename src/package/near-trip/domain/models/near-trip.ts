import { ValidDate } from 'src/package/shared/domain/models/valid-date'
import { TripLocationName } from 'src/package/trip-location/domain/models/trip-location-name'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'

export interface NearTrip {
	id: TripID
	startLocationName: TripLocationName
	endLocationName: TripLocationName
	price: TripPrice
	startDate: ValidDate
	latitude: number
	longitude: number
}
