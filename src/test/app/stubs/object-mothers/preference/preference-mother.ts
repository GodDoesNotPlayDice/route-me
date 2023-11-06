import { faker } from '@faker-js/faker'
import {
	Ok,
	Result
} from 'oxide.ts'
import {
	newPreference,
	Preference
} from 'src/package/preference/domain/models/preference'
import { preferenceSeeds } from 'src/test/app/stubs/seed/preference-seeds'

export class PreferenceMother {
	static random(): Result<Preference, Error[]> {
		return Ok( faker.helpers.arrayElement( preferenceSeeds ) )
	}

	static invalid(): Result<Preference, Error[]> {
		return newPreference( {
			name  : '',
			icon  : '',
			source: ''
		} )
	}
}
