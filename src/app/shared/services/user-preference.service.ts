import { Injectable } from '@angular/core'
import {
  newPreference,
  Preference
} from 'src/package/preference'

@Injectable( {
  providedIn: 'root'
} )
export class UserPreferenceService {

  context: Map<string, Preference> = defaultPreferenceMap()

  getUserPreferences(): Map<string, Preference> {
    return this.context
  }
}

function defaultPreferenceMap(): Map<string, Preference> {
  const list: Preference[] = [
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
  return new Map<string, Preference>(
    list.map( ( item ) => [ item.name.value, item ] ) )
}
