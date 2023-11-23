import {
	Err,
	None,
	Ok,
	Option,
	Result,
	Some
} from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newPassengerBirthDay } from 'src/package/passenger/domain/models/passenger-birth-day'
import { newPassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { newPassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { newPassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import {
	preferenceFromJson,
	preferenceToJson
} from 'src/package/preference/application/preference-mapper'
import { Preference } from 'src/package/preference/domain/models/preference'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newGender } from 'src/package/shared/domain/models/gender'
import {
	ImageUrl,
	newImageUrl
} from 'src/package/shared/domain/models/image-url'
import { newPhone } from 'src/package/shared/domain/models/phone'
import { newValidNumber } from 'src/package/shared/domain/models/valid-number'
import {
	dateFromJSON,
	dateToJSON
} from 'src/package/shared/utils/date/date-mapper'
import {newValidBoolean} from "../../shared/domain/models/valid-bool";

/**
 * Create a json from passenger instance
 * @throws {UnknownException} - if unknown error
 */
export const passengerToJson = ( passenger: Passenger ): Result<Record<string, any>, Error[]> => {
	try {
		const err: Error[] = []

		const json: Record<string, any> = {
			id            : passenger.id.value,
			email         : passenger.email.value,
			name          : passenger.name.value,
			last_name     : passenger.lastName.value,
			description   : passenger.description.value,
			gender        : passenger.gender,
			country       : passenger.country.value,
			birth_day     : dateToJSON( passenger.birthDay.value ),
			average_rating: passenger.averageRating.value,
			phone         : passenger.phone.value,
			in_trip : passenger.inTrip.value
		}

		if ( passenger.image.isSome() ) {
			json['image'] = passenger.image.unwrap().value
		}
		else {
			json['image'] = ''
		}

		const preferences: Record<string, any>[] = []
		for ( const preference of passenger.preferences ) {
			const preferenceResult = preferenceToJson( preference )

			if ( preferenceResult.isErr() ) {
				err.push( preferenceResult.unwrapErr() )
			}
			else {
				preferences.push( preferenceResult.unwrap() )
			}
		}

		if ( preferences.length > 0 ) {
			json['preferences'] = preferences
		}
		else {
			json['preferences'] = null
		}

		if ( err.length > 0 ) {
			return Err( err )
		}

		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error user to json' )
		return Err( [ err ] )
	}
}

/**
 * Create a passenger instance from json
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 * @throws {PreferenceIdInvalidException} - if preference id is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 * @throws {ImageUrlInvalidException} - if image is invalid
 */
export const passengerFromJson = ( json: Record<string, any> ): Result<Passenger, Error[]> => {

	const err: Error[] = []

	const id = newPassengerID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const email = newEmail( {
		value: json['email'] ?? ''
	} )

	if ( email.isErr() ) {
		err.push( email.unwrapErr() )
	}

	const name = newPassengerName( {
		value: json['name'] ?? ''
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	const lastName = newPassengerLastName( {
		value: json['last_name'] ?? ''
	} )

	if ( lastName.isErr() ) {
		err.push( lastName.unwrapErr() )
	}

	const description = newPassengerDescription( {
		value: json['description'] ?? ''
	} )

	if ( description.isErr() ) {
		err.push( description.unwrapErr() )
	}

	const gender = newGender( {
		value: json['gender'] ?? ''
	} )

	if ( gender.isErr() ) {
		err.push( gender.unwrapErr() )
	}

	const country = newPassengerCountry( {
		value: json['country'] ?? ''
	} )

	if ( country.isErr() ) {
		err.push( country.unwrapErr() )
	}

	const birthDay = newPassengerBirthDay( {
		value: dateFromJSON( json['birth_day'] )
	} )

	if ( birthDay.isErr() ) {
		err.push( birthDay.unwrapErr() )
	}

	const phone = newPhone( {
		value: json['phone'] ?? ''
	} )

	if ( phone.isErr() ) {
		err.push( ...phone.unwrapErr() )
	}

	const preferences: Preference[] = []
	if ( json['preferences'] !== undefined ) {
		for ( const preference of Object.values( json['preferences'] ) ) {
			const preferenceResult = preferenceFromJson(
				preference as Record<string, any> )

			if ( preferenceResult.isErr() ) {
				err.push( ...preferenceResult.unwrapErr() )
			}
			else {
				preferences.push( preferenceResult.unwrap() )
			}
		}
	}

	const rating = newValidNumber( {
		value: json['average_rating'] ?? 0
	} )

	if ( rating.isErr() ) {
		err.push( rating.unwrapErr() )
	}

	let image: Option<ImageUrl> = None
	if ( json['image'] !== '' ) {
		const imageResult = newImageUrl( {
			value: json['image']
		} )

		if ( imageResult.isErr() ) {
			err.push( imageResult.unwrapErr() )
		}
		else {
			image = Some( imageResult.unwrap() )
		}
	}

	const inTrip = newValidBoolean({
		value: json['in_trip']
	})

	if (inTrip.isErr()){
		err.push(inTrip.unwrapErr())
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		id           : id.unwrap(),
		image        : image,
		email        : email.unwrap(),
		name         : name.unwrap(),
		lastName     : lastName.unwrap(),
		description  : description.unwrap(),
		gender       : gender.unwrap(),
		phone        : phone.unwrap(),
		inTrip: inTrip.unwrap(),
		country      : country.unwrap(),
		birthDay     : birthDay.unwrap(),
		averageRating: rating.unwrap(),
		preferences  : preferences
	} )
}
