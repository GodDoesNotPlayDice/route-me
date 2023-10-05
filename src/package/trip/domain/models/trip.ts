import { CategoryID } from 'src/package/category/domain/models/category-id'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import {
	newComparableDate,
	newComparator
} from 'src/package/shared/domain/models/comparable-date'
import { newLimitDate } from 'src/package/shared/domain/models/limit-date'
import {
	Location,
	newLocation
} from 'src/package/shared/domain/models/location'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import {
	newTripDescription,
	TripDescription
} from 'src/package/trip/domain/models/trip-description'
import {
	newTripFeeMethod,
	TripFeeMethod
} from 'src/package/trip/domain/models/trip-fee-method'
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
	driverID: DriverID
	categoryID: CategoryID
	chatID: ChatID
	passengersID: PassengerID[]
	name: TripName
	description: TripDescription
	state: TripState
	price: TripPrice
	seat: TripSeat
	paymentMethod: TripFeeMethod
	startLocation: Location
	endLocation: Location
	startDate: Date
	endDate: Date
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
	endDate: Date
}

export const newTrip = ( props: TripProps ): Trip => {
	const endDateValid = newValidDate( {
		value: props.endDate
	} )

	const startDateValid = newValidDate( {
		value: props.startDate
	} )

	const startDateInRange = newLimitDate( {
		value   : startDateValid.value,
		numTimes: 12096e5
	} )

	const endDateInRange = newLimitDate( {
		value   : endDateValid.value,
		numTimes: 12096e5
	} )

	const startDate = newComparableDate( {
		value     : startDateInRange.value,
		otherDate : endDateInRange.value,
		comparator: newComparator( {
			value: 'Before'
		} )
	} )

	const endDate = newComparableDate( {
		value     : endDateInRange.value,
		otherDate : startDateInRange.value,
		comparator: newComparator( {
			value: 'After'
		} )
	} )


	const seat = newTripSeat( {
		value: props.seat
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
		paymentMethod: newTripFeeMethod( {
			value: props.paymentMethod
		} ),
		description  : newTripDescription( {
			value: props.description
		} ),
		state        : newTripState( {
			value: props.state
		} ),
		price        : newTripPrice( {
			amount  : props.price.amount,
			currency: props.price.currency
		} ),
		seat         : seat,
		startLocation: newLocation( {
			value: props.startLocation
		} ),
		endLocation  : newLocation( {
			value: props.endLocation
		} ),
		startDate    : startDate.value,
		endDate      : endDate.value
	}
}
