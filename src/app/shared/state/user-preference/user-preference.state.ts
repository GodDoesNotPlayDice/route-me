import { Preference } from 'src/package/preference/domain/models/preference'

export interface UserPreferencesState {
	value: Preference[],
}
