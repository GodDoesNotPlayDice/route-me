import { Option } from 'oxide.ts'
import { Category } from 'src/package/category/domain/models/category'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { TripDescription } from 'src/package/trip/domain/models/trip-description'
import { TripFeeMethod } from 'src/package/trip/domain/models/trip-fee-method'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export interface Trip {
	id: TripID
	startDate: Date
	endDate: Date
	description: TripDescription
	state: TripState
	feeMethod: TripFeeMethod
	price: TripPrice
	driver: Driver
	chatID: ChatID
	startLocation: TripLocation
	endLocation: TripLocation
	category: Option<Category>
	queuePassengers: Passenger[]
	passengers: Passenger[]
}
