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
import { newLocationID } from 'src/package/shared/domain/models/location/location-id'
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
				description  : json['description'],
				driverID     : newDriverID( {
					value: json['driverID']
				} ),
				passengers   : passenger,
				category     : newCategoryID( {
					value: json['category']
				} ),
				chat         : newChatID( {
					value: json['chat']
				} ),
				startDate    : new Date( json['startDate'] ),
				endDate    : new Date( json['endDate'] ),
				startLocationID: newLocationID({
          value: json['startLocationID']
        }),
        endLocationID: newLocationID({
          value: json['endLocationID']
        }),
			} )
		)
	}
	catch ( e ) {
		console.log( 'error trip from json' )
		console.log( e )
		return None
	}
}

export const tripToJSON = ( trip: Trip): Record<string, any> => {

	const passengers = trip.passengersID.map(
		( passengers: PassengerID ) => {
			return passengers.value
		} )

	return {
		id           : trip.id.value,
		description  : trip.description.value,
		driverID     : trip.driverID.value,
		passengers   : passengers,
		category     : trip.categoryID.value,
		chat         : trip.chatID.value,
		startDate    : trip.startDate.toJSON(),
		endDate      : trip.endDate.toJSON(),
		startLocation: trip.startLocation.value,
		endLocation  : trip.endLocation.value,
	}
}
