import {
	Err,
	None,
	Ok,
	Option,
	Result,
    Some
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newPassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { newPassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import {
	newPreference,
	Preference,
	PreferenceProps
} from 'src/package/preference/domain/models/preference'
import { newEmail } from 'src/package/shared/domain/models/email'
import { newGender } from 'src/package/shared/domain/models/gender'
import {
	ImageUrl,
	newImageUrl
} from 'src/package/shared/domain/models/image-url'
import { newPhone } from 'src/package/shared/domain/models/phone'

/**
 * Update passenger
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {ImageUrlInvalidException} - if image is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if length exceeds maximum
 * @throws {PassengerCountryInvalidException} - if country is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 */
export const updatePassenger = async (
	dao: PassengerDao,
	passenger: Passenger, partialProps: {
		email?: string,
		image?: string,
		name?: string,
		lastName?: string,
		description?: string,
		phone?: string,
		country?: string,
		gender?: string
		preferences?: PreferenceProps[],
	}
): Promise<Result<Passenger, Error[]>> => {

	const err: Error[] = []

	const email = newEmail( {
		value: partialProps.email ?? passenger.email.value
	} )

	if ( email.isErr() ) {
		err.push( email.unwrapErr() )
	}

	let image : Option<ImageUrl> = passenger.image
	if ( partialProps.image !== undefined ) {
		const imageResult = newImageUrl( {
			value: partialProps.image
		} )

		if ( imageResult.isErr() ) {
			err.push( imageResult.unwrapErr() )
		}
		else {
			image = Some(imageResult.unwrap())
		}
	}

	const name = newPassengerName( {
		value: partialProps.name ?? passenger.name.value
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	const lastName = newPassengerLastName( {
		value: partialProps.lastName ?? passenger.lastName.value
	} )

	if ( lastName.isErr() ) {
		err.push( lastName.unwrapErr() )
	}

	const description = newPassengerDescription( {
		value: partialProps.description ?? passenger.description.value
	} )

	if ( description.isErr() ) {
		err.push( description.unwrapErr() )
	}

	const phone = newPhone( {
		value: partialProps.phone ?? passenger.phone.value
	} )

	if ( phone.isErr() ) {
		err.push( ...phone.unwrapErr() )
	}

	const country = newPassengerCountry( {
		value: partialProps.country ?? passenger.country.value
	} )

	if ( country.isErr() ) {
		err.push( country.unwrapErr() )
	}

	const gender = newGender( {
		value: partialProps.gender ?? passenger.gender
	} )

	if ( gender.isErr() ) {
		err.push( gender.unwrapErr() )
	}

	let preferences: Preference[] = []
	if ( partialProps.preferences !== undefined &&
		partialProps.preferences.length > 0 )
	{
		for ( const preference of partialProps.preferences ) {
			const pref = newPreference( preference )

			if ( pref.isErr() ) {
				err.push( ...pref.unwrapErr() )
				break
			}
			preferences.push( pref.unwrap() )
		}
	}
	else {
		preferences = passenger.preferences
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const newPassenger: Passenger = {
		image        : image,
		name         : name.unwrap(),
		lastName     : lastName.unwrap(),
		description  : description.unwrap(),
		phone        : phone.unwrap(),
		country      : country.unwrap(),
		email        : email.unwrap(),
		gender       : gender.unwrap(),
		averageRating: passenger.averageRating,
		preferences  : preferences,
		id           : passenger.id,
		birthDay     : passenger.birthDay
	}

	const result = await dao.update( newPassenger )

	if ( result.isErr() ) {
		err.push( ...result.unwrapErr() )
		return Err( err )
	}

	return Ok( newPassenger )
}
