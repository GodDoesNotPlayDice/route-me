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
import { PreferencesSelectorComponent } from 'src/app/shared/components/preferences-selector/preferences-selector.component'
import { UserPreferenceService } from 'src/app/shared/services/user-preference.service'
import { Preference } from 'src/package/preference/domain/models/preference'

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
    private userPreferenceService: UserPreferenceService
  )
  {
    this.databasePreferences = this.userPreferenceService.getUserPreferences()
  }

  @Input() required = false

  readonly preferencesControl = new FormControl<Preference[]>( [],
    control => {
      if ( this.required && control.value.length === 0 ) {
        control.addValidators( Validators.required )
        return { required: true }
      }
      return null
    } )

  selectedPreferences: Preference[] = []
  databasePreferences               = new Map<string, Preference>()

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component     : PreferencesSelectorComponent,
      componentProps: {
        preferencesData    : this.databasePreferences,
        selectedPreferences: new Map<string, Preference>(
          this.selectedPreferences.map(
            ( item ) => [ item.name.value, item ] ) )
      }
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    this.selectedPreferences = data
    console.log( 'selectedPreferences', this.selectedPreferences )

    // if ( role1 === 'confirm' ) {}

    this.preferencesControl.patchValue( this.selectedPreferences )
    this.preferencesControl.updateValueAndValidity()
  }
}
