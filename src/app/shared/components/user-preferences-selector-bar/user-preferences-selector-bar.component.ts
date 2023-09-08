import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { selectUserPreferencesRegister } from 'src/app/state/user-register/user-register.selectors'
import { UserPreference } from 'src/app/state/user-register/user-register.state'
import {
  PreferenceItem,
  UserPreferencesSelectorComponent
} from '../user-preferences-selector/user-preferences-selector.component'
import { ModalController } from '@ionic/angular'

@Component( {
  selector   : 'app-user-preferences-selector-bar',
  templateUrl: './user-preferences-selector-bar.component.html',
  styleUrls  : [ './user-preferences-selector-bar.component.scss' ]
} )
export class UserPreferencesSelectorBarComponent {

  constructor( private modalCtrl: ModalController,
    private store: Store<AppState> )
  {
    this.preferencesUser$ = this.store.select( selectUserPreferencesRegister )
  }

  preferencesUser$: Observable<UserPreference[]>

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component: UserPreferencesSelectorComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    if ( role === 'confirm' ) {
      // TODO: colocar cancel como reset
    }
  }
}
