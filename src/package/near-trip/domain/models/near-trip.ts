import { LocationName } from 'src/package/location/domain/models/location-name'
import { ValidDate } from 'src/package/shared/domain/models/valid-date'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'

export interface NearTrip {
  id: TripID
  startLocationName: LocationName
  endLocationName: LocationName
  price: TripPrice
  startDate: ValidDate
  latitude: number,
  longitude: number
}
