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
import { PreferencesSelectorComponent } from 'src/app/shared/components/preferences-selector/preferences-selector.component'
import { UserPreferenceService } from 'src/app/shared/services/user-preference.service'
import { AppState } from 'src/app/shared/state/app.state'
import { updateUserPreferences } from 'src/app/shared/state/user-preference/user-preference.actions'
import { selectUserPreferences } from 'src/app/shared/state/user-preference/user-preference.selectors'
import { Preference } from 'src/package/preference/domain/models/preference'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'

@Component( {
  standalone : true,
  selector   : 'app-user-preferences-selector-bar',
  templateUrl: './preferences-selector-bar.component.html',
  styleUrls  : [ './preferences-selector-bar.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    PreferencesSelectorComponent
  ]
} )
export class PreferencesSelectorBarComponent {

  constructor(
    private modalCtrl: ModalController,
    private userPreferenceService: UserPreferenceService,
    private store: Store<AppState>
  )
  {
    //TODO: tomar desde authService
    this.preferencesUser$    = this.store.select( selectUserPreferences )
    this.databasePreferences = this.userPreferenceService.getUserPreferences()
    this.preferencesUser$.subscribe(
      ( preferences ) => {
        if ( preferences.length === 0 ) {
          return
        }

        preferences.map( ( item ) => {
          this.selectedPreferences.push( item)
        } )
      }
    )
  }

  @Input() required = false

  readonly preferencesControl = new FormControl<Preference[]>( [],
    control => {
      console.log( 'preferencesControl.value')
      console.log( control.value)
      if ( this.required && control.value.length === 0 ) {
        control.addValidators( Validators.required )
        return { required: true }
      }
      return null
    } )


  preferencesUser$: Observable<Preference[]>
  selectedPreferences : Preference[] = []
  databasePreferences = new Map<string, Preference>()

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component     : PreferencesSelectorComponent,
      componentProps: {
        preferencesData    : this.userPreferenceService.getUserPreferences(),
        selectedPreferences: new Map<string, PreferenceID>(
          this.selectedPreferences.map( ( item ) => {
            return [ item.id.value, item.id ]
          } )
        )
      }
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    this.selectedPreferences = data

    // if ( role1 === 'confirm' ) {}
    this.store.dispatch( updateUserPreferences( {
      value: this.selectedPreferences
    } ) )

    this.preferencesControl.patchValue( this.selectedPreferences )
    this.preferencesControl.updateValueAndValidity()
  }
}
