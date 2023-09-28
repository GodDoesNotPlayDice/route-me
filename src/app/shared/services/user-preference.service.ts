import { Injectable } from '@angular/core'
import {
  newUserPreference,
  UserPreference
} from 'src/app/shared/state/user-register'

@Injectable( {
  providedIn: 'root'
} )
export class UserPreferenceService {

  context: Map<string, UserPreference> = defaultPreferenceMap()

  getUserPreferences(): Map<string, UserPreference> {
    return this.context
  }
}

function defaultPreferenceMap(): Map<string, UserPreference> {
  const list: UserPreference[] = [
    newUserPreference( {
      icon: 'musical-notes-outline',
      name: 'Con Musica'
    } ),
    newUserPreference( {
      icon: 'logo-no-smoking',
      name: 'Sin Fumar'
    } )
  ]
  return new Map<string, UserPreference>(
    list.map( ( item ) => [ item.name, item ] ) )
}
