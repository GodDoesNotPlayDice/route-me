import { CategoryID } from 'src/package/category/domain/models/category-id'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { ValidDate } from 'src/package/shared/domain/models/valid-date'
import { TripDescription } from 'src/package/trip/domain/models/trip-description'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { TripSeat } from 'src/package/trip/domain/models/trip-seat'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export interface Trip {
  id: TripID
  driverID: DriverID
  categoryID: CategoryID
  chatID: ChatID
  passengersID: PassengerID[]
  startDate: ValidDate
  endDate: ValidDate
  description: TripDescription
  startLocation: LocationID
  endLocation: LocationID
  price: TripPrice
  seat: TripSeat
  state: TripState
}
