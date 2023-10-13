import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newPreference,
	Preference
} from 'src/package/preference/domain/models/preference'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a preference instance from json
 * @throws {PreferenceIdInvalidException} - if id is invalid
 * @throws {PreferenceNameInvalidException} - if name is invalid
 * @throws {PreferenceIconInvalidException} - if icon is invalid
 */
export const preferenceFromJson = ( json: Record<string, any> ): Result<Preference, Error[]> => {
	const rating = newPreference( {
		id   : json['id'],
		name : json['name'],
		icon : json['icon']
	} )

	if ( rating.isErr() ) {
		return Err( rating.unwrapErr() )
	}

	return Ok( rating.unwrap())
}

/**
 * Create a json from preference instance
 * @throws {UnknownException} - if unknown error
 */
export const preferenceToJson = ( preference : Preference ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id   : preference.id.value,
			name : preference.name.value,
			icon : preference.icon.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error preference to json' )
		return Err( err )
	}
}
