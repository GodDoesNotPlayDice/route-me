import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	newPreferenceIcon,
	PreferenceIcon,
	PreferenceIconProps
} from 'src/package/preference/domain/models/preference-icon'
import {
	newPreferenceID,
	PreferenceID,
	PreferenceIDProps
} from 'src/package/preference/domain/models/preference-id'
import {
	newPreferenceName,
	PreferenceName,
	PreferenceNameProps
} from 'src/package/preference/domain/models/preference-name'
import {
	newPreferenceSource,
	PreferenceSource,
	PreferenceSourceProps
} from 'src/package/preference/domain/models/preference-source'

export interface Preference {
	id: PreferenceID
	name: PreferenceName
	icon: PreferenceIcon
	source: PreferenceSource
}

export interface PreferenceProps {
	id: string
	name: string
	icon: string
	source: string
}

/**
 * Create a preference instance
 * @throws {PreferenceIdInvalidException} - if id is invalid
 * @throws {PreferenceNameInvalidException} - if name is invalid
 * @throws {PreferenceIconInvalidException} - if icon is invalid
 */
export const newPreference = ( props: PreferenceProps): Result<Preference, Error[]> => {
	const err: Error[] = []
	const id           = newPreferenceID( {
		value: props.id
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const name = newPreferenceName( {
		value: props.name
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	const icon = newPreferenceIcon( {
		value: props.icon
	} )

	if ( icon.isErr() ) {
		err.push( icon.unwrapErr() )
	}

	const source = newPreferenceSource( {
		value: props.source
	} )

	if ( source.isErr() ) {
		err.push( source.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		id  : id.unwrap(),
		name: name.unwrap(),
		icon: icon.unwrap(),
		source: source.unwrap()
	} )
}

