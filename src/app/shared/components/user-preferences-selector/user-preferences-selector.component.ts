import {
  Component
} from '@angular/core'
import {
  ModalController,
  ViewDidEnter
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import {
  clearUserRegister,
  updateUserRegister
} from 'src/app/state/user-register/user-register.actions'
import { selectUserPreferencesRegister } from 'src/app/state/user-register/user-register.selectors'


@Component( {
  selector   : 'app-user-preferences-selector',
  templateUrl: './user-preferences-selector.component.html',
  styleUrls  : [ './user-preferences-selector.component.scss' ]
} )
export class UserPreferencesSelectorComponent {

  constructor( private modalCtrl: ModalController,
    private store: Store<AppState> )
  {
    this.store.select( selectUserPreferencesRegister )
        .pipe(take(1))
        .subscribe(
          ( preferences ) => {
            if ( preferences.length === 0 ) {
              return
            }
            preferences.map( ( item ) => {
              const pref = this.databasePreferencesList.get( item.name )
              if ( pref !== undefined ) {
                pref.selected = true
                this.selectedPreferencesList.set( item.name, pref )
              }
            })
          }
        )
  }


  databasePreferencesList: Map<string, PreferenceItem> = defaultPreferenceMap()

  selectedPreferencesList = new Map<string, PreferenceItem>()

  cancel() {
    this.store.dispatch( clearUserRegister() )
    return this.modalCtrl.dismiss( false, 'cancel' )
  }

  confirm() {
    this.store.dispatch( updateUserRegister( {
      preferences: Array.from(
        this.selectedPreferencesList.values())
      .map( ( item ) => { return { name: item.name, icon: item.icon} })
    }))
    return this.modalCtrl.dismiss( true, 'confirm' )
  }

  public onSelectItem( $event: string ): void {

    const pref = this.databasePreferencesList.get( $event )

    if ( pref !== undefined ) {
      this.selectedPreferencesList.set( $event, {
        ...pref,
        selected: true
      } )
    }
  }

  public onDeselectItem( $event: string ): void {
    const pref = this.databasePreferencesList.get( $event )

    if ( pref !== undefined ) {
      this.selectedPreferencesList.delete( $event )
    }
  }
}

function defaultPreferenceMap(): Map<string, PreferenceItem> {
  const list: PreferenceItem[] = [
    {
      icon    : 'musical-notes-outline',
      name    : 'Con Musica',
      selected: false
    },
    {
      icon    : 'logo-no-smoking',
      name    : 'Sin Fumar',
      selected: false
    }
  ]
  return new Map<string, PreferenceItem>(
    list.map( ( item ) => [ item.name, item ] ) )
}

export interface PreferenceItem {
  icon: string,
  name: string,
  selected: boolean
}
