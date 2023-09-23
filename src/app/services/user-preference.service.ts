import { Injectable } from '@angular/core'
import { UserPreference } from 'src/app/state/user-register/user-register.state'

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
    UserPreference.parse( {
      icon: 'musical-notes-outline',
      name: 'Con Musica'
    } ),
    UserPreference.parse( {
      icon: 'logo-no-smoking',
      name: 'Sin Fumar'
    } )
  ]
  return new Map<string, UserPreference>(
    list.map( ( item ) => [ item.name, item ] ) )
}
