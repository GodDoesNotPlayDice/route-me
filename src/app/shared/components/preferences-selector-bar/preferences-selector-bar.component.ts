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
import { Observable } from 'rxjs'
import { UserPreferenceService } from 'src/app/shared/services'
import { Preference } from 'src/package/preference'
import { PreferencesSelectorComponent } from '..'

@Component( {
  standalone : true,
  selector   : 'app-user-preferences-selector-bar',
  templateUrl: './preferences-selector-bar.component.html',
  styleUrls  : [ './preferences-selector-bar.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    MatInputModule,
    MatSelectModule
  ]
} )
export class PreferencesSelectorBarComponent {

  constructor(
    private modalCtrl: ModalController,
    private userPreferenceService: UserPreferenceService
  )
  {
    //TODO: tomar desde authService
    this.preferencesUser$    = this.store.select( selectPassengerPreferencesRegister )
    this.databasePreferences = this.userPreferenceService.getUserPreferences()
    this.preferencesUser$.subscribe(
      ( preferences ) => {
        if ( preferences.length === 0 ) {
          return
        }

        preferences.map( ( item ) => {
          this.selectedPreferences.set( item.name, item )
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
  selectedPreferences = new Map<string, Preference>()
  databasePreferences = new Map<string, Preference>()

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component     : PreferencesSelectorComponent,
      componentProps: {
        preferencesData    : this.userPreferenceService.getUserPreferences(),
        selectedPreferences: this.selectedPreferences
      }
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    // if ( role1 === 'confirm' ) {}
    this.store.dispatch( updatePassengerRegister( {
      preferences: data
    } ) )

    this.preferencesControl.patchValue( data )
    this.preferencesControl.updateValueAndValidity()
  }
}
