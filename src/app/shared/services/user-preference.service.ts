import { Injectable } from '@angular/core'
import { Preference } from 'src/package/preference/domain/models/preference'

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
    {
      id  : {
        value: '1'
      },
      icon: {
        value: 'musical-notes-outline'
      },
      name: {
        value: 'Con Musica'
      }
    },
    {
      id  : {
        value: '2'
      },
      icon: {
        value: 'logo-no-smoking'
      },
      name: {
        value: 'Sin Fumar'
      }
    }
  ]
}
