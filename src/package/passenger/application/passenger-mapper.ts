import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newPassenger,
	Passenger
} from 'src/package/passenger/domain/models/passenger'
import {
	newPreferenceID,
	PreferenceID
} from 'src/package/preference/domain/models/preference-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newGender } from 'src/package/shared/domain/models/gender'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Create a json from passenger instance
 * @throws {UnknownException} - if unknown error
 */
export const passengerToJson = ( passenger: Passenger ): Result<Record<string, any>, Error> => {
	try {
		const preferences = passenger.preferences.map(
			( preference: PreferenceID ) => {
				return preference.value
			} )

		return Ok( {
				id         : passenger.id.value,
				userID     : passenger.userID.value,
				name       : passenger.name.value,
				lastName   : passenger.lastName.value,
				description: passenger.description.value,
				phone      : passenger.phone.value,
				birthDay   : passenger.birthDay.value.toJSON(),
				country    : passenger.country.value,
				gender     : passenger.gender,
				preferences
			}
		)
	}
	catch ( e ) {
		return Err( new UnknownException( 'error passenger to json' ) )
	}
}

/**
 * Create a passenger instance from json
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PassengerPhoneInvalidException} - if phone is invalid
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 */
export const passengerFromJson = ( json: Record<string, any> ): Result<Passenger, Error[]> => {
	const error: Error[]              = []

	const preferences: PreferenceID[] = []

	for ( const preference of Object.values( json['preferences'] ) ) {
		const value = preference as Record<string, any>
		const result = newPreferenceID( {
			value: value['id']
		} )
		if ( result.isErr() ) {
			error.push( result.unwrapErr() )
		}
		else {
			preferences.push( result.unwrap() )
		}
	}

	const userIDResult = newUserID( {
		value: json['userID']
	} )

	if ( userIDResult.isErr() ) {
		error.push( userIDResult.unwrapErr() )
	}

	const genderResult = newGender( {
		value: json['gender']
	} )

	if ( genderResult.isErr() ) {
		error.push( genderResult.unwrapErr() )
	}

	if ( error.length > 0 ) {
		return Err( error )
	}

	const result = newPassenger( {
		id         : json['id'],
		userID     : userIDResult.unwrap(),
		name       : json['name'],
		lastName   : json['lastName'],
		description: json['description'],
		phone      : json['phone'],
		birthDay   : new Date( json['birthDay'] ),
		country    : json['country'],
		gender     : genderResult.unwrap(),
		preferences: preferences
	} )

	if ( result.isErr() ) {
		error.push( ...result.unwrapErr() )
		return Err( error )
	}

	return Ok( result.unwrap() )
}
