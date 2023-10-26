import {
	Ok,
	Result
} from 'oxide.ts'
import {
	newPreference,
	Preference
} from 'src/package/preference/domain/models/preference'
import { PreferenceIconMother } from 'src/test/app/stubs/object-mothers/preference/preference-icon-mother'
import { PreferenceIDMother } from 'src/test/app/stubs/object-mothers/preference/preference-id-mother'
import { PreferenceNameMother } from 'src/test/app/stubs/object-mothers/preference/preference-name-mother'

export class PreferenceMother {
	static random() :Result<Preference, Error[]>{
		return Ok({
			id: PreferenceIDMother.random().unwrap(),
			name: PreferenceNameMother.random().unwrap(),
			icon: PreferenceIconMother.random().unwrap()
		})
	}

	static invalid() :Result<Preference, Error[]>{
		return newPreference({
			id: '',
			name: '',
			icon: ''
		})
	}
}
