import {
  Component,
  Input
} from '@angular/core'
import { Store } from '@ngrx/store'
import {Observable} from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { selectUserPreferencesRegister } from 'src/app/state/user-register/user-register.selectors'
import { UserPreference } from 'src/app/state/user-register/user-register.state'
import {
  UserPreferencesSelectorComponent
} from '../user-preferences-selector/user-preferences-selector.component'
import { ModalController } from '@ionic/angular'
import {
  updateUserRegister
} from "../../../state/user-register/user-register.actions";
import {
  UserPreferenceService
} from "src/app/services/user-preference/user-preference.service";
import {FormControl, Validators} from "@angular/forms";

@Component( {
  selector   : 'app-user-preferences-selector-bar',
  templateUrl: './user-preferences-selector-bar.component.html',
  styleUrls  : [ './user-preferences-selector-bar.component.scss' ]
} )
export class UserPreferencesSelectorBarComponent {

  constructor(
    private modalCtrl: ModalController,
    private store: Store<AppState>,
    private userPreferenceService : UserPreferenceService
  ) {
    this.preferencesUser$ = this.store.select( selectUserPreferencesRegister )
    this.databasePreferences = this.userPreferenceService.getUserPreferences()
    this.preferencesUser$.subscribe(
        ( preferences ) => {
          if ( preferences.length === 0 ) {
            return
          }

          preferences.map( ( item ) => {
              this.selectedPreferences.set(item.name, item)
          })
        }
      )
  }

  @Input() required = false

  readonly preferencesControl = new FormControl<UserPreference[]>( [], control => {
    if (this.required && control.value.length === 0){
      control.addValidators( Validators.required )
      return { required: true }
    }
    return null
  } )


  preferencesUser$: Observable<UserPreference[]>
  selectedPreferences = new Map<string, UserPreference>()
  databasePreferences = new Map<string, UserPreference>()

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component: UserPreferencesSelectorComponent,
      componentProps:{
        preferencesData : this.userPreferenceService.getUserPreferences(),
        selectedPreferences: this.selectedPreferences
      }
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    // if ( role1 === 'confirm' ) {}
    this.store.dispatch( updateUserRegister( {
      preferences: data
    }))

    this.preferencesControl.patchValue(data);
    this.preferencesControl.updateValueAndValidity();
  }
}
