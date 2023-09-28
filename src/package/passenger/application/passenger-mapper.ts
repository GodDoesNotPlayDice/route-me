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
import { newUserID } from 'src/package/user'

export const userToJson   = ( passenger: Passenger ): Option<Record<string, any>> => {
	try {
		const preferences = passenger.preferences.map(
			( preference: PreferenceID ) => {
				return preference.value
			} )

		const json: Record<string, any> = {
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
		return Some( json )
	}
	catch ( e ) {
		console.log( 'error passenger to json' )
		console.log( e )
		return None
	}
}
export const userFromJson = ( json: Record<string, any> ): Option<Passenger> => {
	try {
		const preferences: PreferenceID[] = Object.values( json['preferences'] )
      .map( ( preference: any ) => {
        return newPreferenceID(
          preference.name )
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
				gender     : json['gender'],
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
