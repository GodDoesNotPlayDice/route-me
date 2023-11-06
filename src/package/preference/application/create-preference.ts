import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { Preference } from 'src/package/preference/domain/models/preference'
import { newPreferenceIcon } from 'src/package/preference/domain/models/preference-icon'
import { newPreferenceID } from 'src/package/preference/domain/models/preference-id'
import { newPreferenceName } from 'src/package/preference/domain/models/preference-name'
import { newPreferenceSource } from 'src/package/preference/domain/models/preference-source'
import { ulid } from 'ulidx'

export const createPreference = async ( dao: PreferenceDao,
	props: {
		name: string
		source: string
		icon: string
	}
): Promise<Result<Preference, Error[]>> => {
	const err: Error[] = []

	const id = newPreferenceID( {
		value: ulid()
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
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

	const name = newPreferenceName( {
		value: props.name
	} )

	if ( name.isErr() ) {
		err.push( name.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const result: Preference = {
		id    : id.unwrap(),
		icon  : icon.unwrap(),
		source: source.unwrap(),
		name  : name.unwrap()
	}

	const response = await dao.create( result )

	if ( response.isErr() ) {
		err.push( ...response.unwrapErr() )
		return Err( err )
	}

	return Ok( result )
}
