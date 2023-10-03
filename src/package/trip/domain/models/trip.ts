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
  newTripPaymentMethod,
  TripPaymentMethod
} from 'src/package/trip/domain/models/trip-payment-method'
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
	driverID: DriverID
	categoryID: CategoryID
	chatID: ChatID
	passengersID: PassengerID[]
	name: TripName
	description: TripDescription
	state: TripState
	price: TripPrice
	seat: TripSeat
  paymentMethod : TripPaymentMethod
	startLocation: Location
	endLocation: Location
	startDate: CreatedAt
	endDate: EndTripDate
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
  paymentMethod: string,
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
		passengersID : props.passengers,
		categoryID   : props.category,
		chatID       : props.chat,
		name         : newTripName( {
			value: props.name
		} ),
    paymentMethod: newTripPaymentMethod({
      value: props.paymentMethod
    }),
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
