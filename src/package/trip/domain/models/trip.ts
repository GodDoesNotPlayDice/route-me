import { CategoryID } from 'src/package/category'
import { ChatID } from 'src/package/chat/domain/models'
import { DriverID } from 'src/package/driver/domain/models'
import { PassengerID } from 'src/package/passenger'
import {
	CreatedAt,
	Location,
	newCreatedAt,
	newLocation
} from 'src/package/shared'
import {
	EndTripDate,
	newEndTripDate,
	newTripDescription,
	newTripID,
	newTripName,
	newTripPrice,
	newTripSeat,
	newTripState,
	TripDescription,
	TripID,
	TripName,
	TripPrice,
	TripPriceProps,
	TripSeat,
	TripState
} from 'src/package/trip/domain/models'

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
