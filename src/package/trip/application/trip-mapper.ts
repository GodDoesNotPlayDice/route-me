import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { newCategoryID } from 'src/package/category/domain/models/category-id'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import {
  newPassengerID,
  PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import {
  newTrip,
  Trip
} from 'src/package/trip/domain/models/trip'

export const tripFromJSON = ( json: Record<string, any> ): Option<Trip> => {
	try {
		const passenger: PassengerID[] = Object.values( json['passengers'] )
		                                       .map( ( id: any ) => {
			                                       return newPassengerID( {
				                                       value: id
			                                       } )
		                                       } )

		return Some(
			newTrip( {
				id           : json['id'],
				name         : json['name'],
				description  : json['description'],
				state        : json['state'],
        paymentMethod: json['paymentMethod'],
				price        : {
					amount  : json['price']['amount'],
					currency: json['price']['currency']
				},
				seat         : json['seat'],
				startLocation: json['startLocation'],
				endLocation  : json['endLocation'],
				startDate    : new Date( json['startDate'] ),
				driverID     : newDriverID( {
					value: json['driverID']
				} ),
				passengers   : passenger,
				category     : newCategoryID( {
					value: json['category']
				} ),
				chat         : newChatID( {
					value: json['chat']
				} )
			} )
		)
	}
	catch ( e ) {
		console.log( 'error trip from json' )
		console.log( e )
		return None
	}
}

export const tripToJSON = ( trip: Trip ): Record<string, any> => {

	const passengers = trip.passengers.map(
		( passengers: PassengerID ) => {
			return passengers.value
		} )

	return {
		id           : trip.id.value,
		name         : trip.name.value,
		description  : trip.description.value,
		state        : trip.state,
		price        : {
			amount  : trip.price.amount.value,
			currency: trip.price.currency.value
		},
		seat         : trip.seat.value,
		startLocation: trip.startLocation.value,
		endLocation  : trip.endLocation.value,
		startDate    : trip.startDate.value,
		endDate      : trip.endDate.value,
		driverID     : trip.driverID.value,
		passengers   : passengers,
		category     : trip.category.value,
		chat         : trip.chat.value
	}
}
