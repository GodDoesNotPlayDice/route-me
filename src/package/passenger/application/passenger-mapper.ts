import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
	newPassenger,
	Passenger
} from 'src/package/passenger/domain'
import {
	newPreferenceID,
	PreferenceID
} from 'src/package/preference'
import { newGender } from 'src/package/shared'
import { newUserID } from 'src/package/user'

export const passengerToJson   = ( passenger: Passenger ): Record<string, any> => {

	const preferences = passenger.preferences.map(
		( preference: PreferenceID ) => {
			return preference.value
		} )

	return {
		id         : passenger.id.value,
		userID     : passenger.userID.value,
		name       : passenger.name.value,
		lastName   : passenger.lastName.value,
		description: passenger.description.value,
		phone      : passenger.phone.value,
		birthDay   : passenger.birthDay.value,
		country    : passenger.country.value,
		gender     : passenger.gender.value,
		preferences
	}
}
export const passengerFromJson = ( json: Record<string, any> ): Option<Passenger> => {
	try {
		const preferences: PreferenceID[] = Object.values( json['preferences'] )
		                                          .map( ( preference: any ) => {
			                                          return newPreferenceID( {
				                                          value: preference
			                                          } )
		                                          } )

		return Some(
			newPassenger( {
				id         : json['id'],
				userID     : newUserID( {
					value: json['userID']
				} ),
				name       : json['name'],
				lastName   : json['lastName'],
				description: json['description'],
				phone      : json['phone'],
				birthDay   : new Date( json['birthDay'] ),
				country    : json['country'],
				gender     : newGender( {
					value: json['gender']
				} ),
				preferences
			} )
		)
	}
	catch ( e ) {
		console.log( 'error passenger from json' )
		console.log( e )
		return None
	}
}
