import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import {
  FormControl,
  Validators
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { UserPreferenceService } from 'src/app/services/user-preference/user-preference.service'
import { AppState } from 'src/app/state/app.state'
import { selectUserPreferencesRegister } from 'src/app/state/user-register/user-register.selectors'
import { UserPreference } from 'src/app/state/user-register/user-register.state'
import { updateUserRegister } from 'src/app/state/user-register/user-register.actions'
import { UserPreferencesSelectorComponent } from '../user-preferences-selector/user-preferences-selector.component'

@Component( {
  standalone: true,
  selector   : 'app-user-preferences-selector-bar',
  templateUrl: './user-preferences-selector-bar.component.html',
  styleUrls  : [ './user-preferences-selector-bar.component.scss' ],
  imports: [
    IonicModule,
    CommonModule,
    MatInputModule,
    MatSelectModule
  ]
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
