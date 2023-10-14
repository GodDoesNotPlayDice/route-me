import { CategoryName } from 'src/package/category/domain/models/category-name'
import { Location } from 'src/package/location/domain/models/location'
import { ValidDate } from 'src/package/shared/domain/models/valid-date'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export interface NearTrip {
  id: TripID
  startDate: ValidDate
  endDate: ValidDate
  startLocation: Location
  endLocation: Location
  categoryName: CategoryName
}
