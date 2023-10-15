import { Option } from 'oxide.ts'
import { CategoryID } from 'src/package/category/domain/models/category-id'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { TripDescription } from 'src/package/trip/domain/models/trip-description'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { TripSeat } from 'src/package/trip/domain/models/trip-seat'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export interface Trip {
  id: TripID
  driverID: DriverID
  chatID: ChatID
  passengersID: PassengerID[]
  startDate: Date
  endDate: Date
  startLocation: LocationID
  endLocation: LocationID
  categoryID: Option<CategoryID>
  description: Option<TripDescription>
  price: Option<TripPrice>
  seat: Option<TripSeat>
  state: Option<TripState>
}
