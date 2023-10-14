import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild
} from '@angular/core'
import {
  FormGroup,
  FormsModule
} from '@angular/forms'
import { Router } from '@angular/router'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputAreaComponent } from 'src/app/shared/components/input-area/input-area.component'
import { MultipleSelectorInputComponent } from 'src/app/shared/components/multiple-selector-input/multiple-selector-input.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UserPreferenceService } from 'src/app/shared/services/user-preference.service'
import { AppState } from 'src/app/shared/state/app.state'
import {
  clearStep,
  notifyStep
} from 'src/app/shared/state/stepper/step.actions'
import {
  newPreferenceID,
  PreferenceID
} from 'src/package/preference/domain/models/preference-id'
import {
  MultipleSelectorData,
  newMultipleSelectorData
} from 'src/package/shared/domain/components/multiple-selector-data'

@Component( {
  standalone : true,
  selector   : 'app-step3',
  templateUrl: './step3.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    StepperComponent,
    InputAreaComponent,
    MultipleSelectorInputComponent,
    FilledButtonComponent,
    FormsModule
  ],
  styleUrls  : [ './step3.page.scss' ]
} )
export class Step3Page implements ViewDidEnter {

  constructor( private store: Store<AppState>, private router: Router,
    private userPreferenceService: UserPreferenceService,
    private auth: AuthService )
  {
    //TODO: colocar con observable despues, como en country service
    this.preferences = this.userPreferenceService.getUserPreferences()
                           .map(
                             ( preference ) => newMultipleSelectorData( {
                               id      : preference.id.value,
                               name    : preference.name.value,
                               icon    : preference.icon.value,
                               selected: false
                             } ) )
  }

  @ViewChild( 'area' ) areaInput !: InputAreaComponent
  @ViewChild(
    'preference' ) preferenceInput !: MultipleSelectorInputComponent

  formGroup!: FormGroup

  readonly preferences: MultipleSelectorData[] = []

  ionViewDidEnter() {
    this.formGroup = new FormGroup( [
      this.areaInput.textControl,
      this.preferenceInput.multipleSelectorControl
    ] )
  }

  async submit( $event: SubmitEvent ) {
    $event.preventDefault()
    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if ( !this.formGroup.valid ) {
      return
    }

    const error: Error[]        = []
    const prefs: PreferenceID[] = []
    //TODO: revisar que funcione y quede claro
    for ( const preference of this.preferenceInput.multipleSelectorControl.value! ) {
      const result = newPreferenceID( {
        value: preference
      } )

      if ( result.isErr() ) {
        error.push( result.unwrapErr() )
      }
      else {
        prefs.push( result.unwrap() )
      }
    }

    if ( error.length > 0 ) {
      console.log( 'error updating passenger step3' )
      console.log( error )
      return
    }
    const updated = await this.auth.updatePassenger( {
      description: this.areaInput.textControl.value!,
      preferences: prefs
    } )

    if ( !updated ) {
      console.log( 'error updating passenger step3' )
      return
    }

    this.store.dispatch( notifyStep() )
    this.store.dispatch( clearStep() )

    await this.router.navigate( [ '/tabs/home' ] )
  }
}
