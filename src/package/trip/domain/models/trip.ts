import { Option } from 'oxide.ts'
import { Category } from 'src/package/category/domain/models/category'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Location } from 'src/package/location/domain/models/location'
import { TripDescription } from 'src/package/trip/domain/models/trip-description'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { TripSeat } from 'src/package/trip/domain/models/trip-seat'
import { TripState } from 'src/package/trip/domain/models/trip-state'
import { User } from 'src/package/user/domain/models/user'

export interface Trip {
  id: TripID
  chatID: ChatID
  startLocation: Location
  endLocation: Location
  startDate: Date
  endDate: Date
  description: TripDescription
  state: TripState
  //TODO: ver si en la creacion puede ser util omitir estos campos
  price: Option<TripPrice>
  seat: Option<TripSeat>
  passengers: User[]
  category: Option<Category>
  driver: Driver
}
