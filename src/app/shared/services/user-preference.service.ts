import { Injectable } from '@angular/core'
import {
	newPreference,
	Preference
} from 'src/package/preference/domain/models/preference'

@Injectable( {
	providedIn: 'root'
} )
export class UserPreferenceService {

	readonly userPreferences: Preference[] = defaultPreference()

	getPreferences(): Preference[] {
		return this.userPreferences
	}
}

function defaultPreference(): Preference[] {
	return [
		newPreference({
			id: '0',
			icon: 'musical-notes-outline',
			name: 'Con Musica',
			source: 'ionic',
		}).unwrap(),
		newPreference({
			id:  '1',
			icon:  'logo-no-smoking',
			name:  'Sin Fumar',
			source:  'ionic',
		}).unwrap(),
	]
}
