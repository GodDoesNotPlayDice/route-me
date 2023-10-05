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
  LocationProps,
  newLocation
} from 'src/package/shared/domain/models/location/location'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import {
  newTripDescription,
  TripDescription
} from 'src/package/trip/domain/models/trip-description'
import {
  newTripID,
  TripID
} from 'src/package/trip/domain/models/trip-id'

export interface Trip {
	id: TripID
	driverID: DriverID
	categoryID: CategoryID
	chatID: ChatID
	passengersID: PassengerID[]
	startDate: Date
	endDate: Date
	description: TripDescription
	startLocation: Location
	endLocation: Location
}

export interface TripProps {
	id: string
	driverID: DriverID
	passengers: PassengerID[]
	category: CategoryID
	chat: ChatID
	description: string
	startLocation: LocationProps
	endLocation: LocationProps
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

	return {
		id           : newTripID( {
			value: props.id
		} ),
		driverID     : props.driverID,
		passengersID : props.passengers,
		categoryID   : props.category,
		chatID       : props.chat,
		description  : newTripDescription( {
			value: props.description
		} ),
		startLocation: newLocation( {
			name     : props.startLocation.name,
      longitude: props.startLocation.longitude,
      latitude : props.startLocation.latitude
		} ),
		endLocation  : newLocation( {
      name     : props.endLocation.name,
      longitude: props.endLocation.longitude,
      latitude : props.endLocation.latitude
    } ),
		startDate    : startDate.value,
		endDate      : endDate.value
	}
}
