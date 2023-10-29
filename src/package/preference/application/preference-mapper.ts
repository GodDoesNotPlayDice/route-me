import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Preference } from 'src/package/preference/domain/models/preference'
import { newPreferenceIcon } from 'src/package/preference/domain/models/preference-icon'
import { newPreferenceID } from 'src/package/preference/domain/models/preference-id'
import { newPreferenceName } from 'src/package/preference/domain/models/preference-name'
import { newPreferenceSource } from 'src/package/preference/domain/models/preference-source'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a preference instance from json
 * @throws {PreferenceIdInvalidException} - if id is invalid
 * @throws {PreferenceNameInvalidException} - if name is invalid
 * @throws {PreferenceIconInvalidException} - if icon is invalid
 */
export const preferenceFromJson = ( json: Record<string, any> ): Result<Preference, Error[]> => {
	const errors: Error[] = []

	const id = newPreferenceID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		errors.push( id.unwrapErr() )
	}

	const name = newPreferenceName( {
		value: json['name'] ?? ''
	} )

	if ( name.isErr() ) {
		errors.push( name.unwrapErr() )
	}

	const icon = newPreferenceIcon( {
		value: json['icon'] ?? ''
	} )

	if ( icon.isErr() ) {
		errors.push( icon.unwrapErr() )
	}

	const source = newPreferenceSource( {
		value: json['source'] ?? ''
	})

	if ( source.isErr() ) {
		errors.push( source.unwrapErr() )
	}

	if ( errors.length > 0 ) {
		return Err( errors )
	}

	return Ok( {
		id  : id.unwrap(),
		name: name.unwrap(),
		icon: icon.unwrap(),
		source: source.unwrap()
	} )
}

/**
 * Create a json from preference instance
 * @throws {UnknownException} - if unknown error
 */
export const preferenceToJson = ( preference: Preference ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id  : preference.id.value,
			name: preference.name.value,
			icon: preference.icon.value,
			source: preference.source.value
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
