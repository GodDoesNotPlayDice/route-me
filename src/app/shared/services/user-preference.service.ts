import { Injectable } from '@angular/core'
import {
  newPreference,
  Preference
} from 'src/package/preference/domain/models/preference'

@Injectable( {
  providedIn: 'root'
} )
export class UserPreferenceService {

  private userPreferences: Preference[] = defaultPreference()

  getUserPreferences(): Preference[] {
    return this.userPreferences
  }
}

function defaultPreference(): Preference[] {
  return [
    newPreference( {
      id  : '1',
      icon: 'musical-notes-outline',
      name: 'Con Musica'
    } ),
    newPreference( {
      id  : '2',
      icon: 'logo-no-smoking',
      name: 'Sin Fumar'
    } )
  ]
}
