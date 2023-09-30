import { CategoryID } from 'src/package/category/domain/models/category-id'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import {
  CreatedAt,
  newCreatedAt
} from 'src/package/shared/domain/models/created-at'
import {
  Location,
  newLocation
} from 'src/package/shared/domain/models/location'
import {
  EndTripDate,
  newEndTripDate
} from 'src/package/trip/domain/models/end-trip-date'
import {
  newTripDescription,
  TripDescription
} from 'src/package/trip/domain/models/trip-description'
import {
  newTripID,
  TripID
} from 'src/package/trip/domain/models/trip-id'
import {
  newTripName,
  TripName
} from 'src/package/trip/domain/models/trip-name'
import {
  newTripPrice,
  TripPrice,
  TripPriceProps
} from 'src/package/trip/domain/models/trip-price'
import {
  newTripSeat,
  TripSeat
} from 'src/package/trip/domain/models/trip-seat'
import {
  newTripState,
  TripState
} from 'src/package/trip/domain/models/trip-state'

export interface Trip {
	id: TripID
	name: TripName
	description: TripDescription
	state: TripState
	price: TripPrice
	seat: TripSeat
	startLocation: Location
	endLocation: Location
	startDate: CreatedAt
	endDate: EndTripDate
	driverID: DriverID
	passengers: PassengerID[]
	category: CategoryID
	chat: ChatID
}

export interface TripProps {
	id: string
	driverID: DriverID
	passengers: PassengerID[]
	category: CategoryID
	chat: ChatID
	name: string
	description: string
	state: string,
	price: TripPriceProps
	seat: number
	startLocation: string
	endLocation: string
	startDate: Date
}

export const newTrip = ( props: TripProps ): Trip => {
	const seat      = newTripSeat( {
		value: props.seat
	} )
	const startDate = newCreatedAt( {
		value: props.startDate
	} )
	return {
		id           : newTripID( {
			value: props.id
		} ),
		driverID     : props.driverID,
		passengers   : props.passengers,
		category     : props.category,
		chat         : props.chat,
		name         : newTripName( {
			value: props.name
		} ),
		description  : newTripDescription( {
			value: props.description
		} ),
		state        : newTripState( {
			value: props.state
		} ),
		price        : newTripPrice( {
			amount  : props.price.amount,
			currency: props.price.currency,
		} ),
		seat         : seat,
		startLocation: newLocation( {
			value: props.startLocation
		} ),
		endLocation  : newLocation( {
			value: props.endLocation
		} ),
		startDate    : startDate,
		endDate      : newEndTripDate( {
			value: startDate.value
		} )
	}
}
