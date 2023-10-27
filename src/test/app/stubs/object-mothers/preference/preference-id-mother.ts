import { Result } from 'oxide.ts'
import {
	newPreferenceID,
	PreferenceID
} from 'src/package/preference/domain/models/preference-id'
import { ulid } from 'ulidx'

export class PreferenceIDMother {
	static random(): Result<PreferenceID, Error> {
		return newPreferenceID( {
			value: ulid()
		} )
	}

	static invalid(): Result<PreferenceID, Error> {
		return newPreferenceID( {
			value: ''
		} )
	}
}
