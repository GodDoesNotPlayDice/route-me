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
import { PreferencesSelectorBarComponent } from 'src/app/shared/components/preferences-selector-bar/preferences-selector-bar.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AppState } from 'src/app/shared/state/app.state'
import {
  clearStep,
  notifyStep
} from 'src/app/shared/state/stepper/step.actions'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'

@Component( {
  standalone : true,
  selector   : 'app-step3',
  templateUrl: './step3.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    StepperComponent,
    InputAreaComponent,
    PreferencesSelectorBarComponent,
    FilledButtonComponent,
    FormsModule
  ],
  styleUrls  : [ './step3.page.scss' ]
} )
export class Step3Page implements ViewDidEnter {

  constructor( private store: Store<AppState>, private router: Router, private auth : AuthService ) {
  }

  @ViewChild( 'area' ) areaInput !: InputAreaComponent
  @ViewChild(
    'preference' ) preferenceInput !: PreferencesSelectorBarComponent

  formGroup!: FormGroup

  ionViewDidEnter() {
    this.formGroup = new FormGroup( [
      this.areaInput.textControl,
      this.preferenceInput.preferencesControl
    ] )
  }

  async submit( $event: SubmitEvent ) {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if ( !this.formGroup.valid ) {
      return
    }

    this.store.dispatch( notifyStep() )

    await this.auth.updatePassenger({
      preferences: this.preferenceInput.preferencesControl.value!.map( ( preference ) => preference.id),
      description: newPassengerDescription({
        value: this.areaInput.textControl.value!
      })
    })

    this.store.dispatch( clearStep() )

    await this.router.navigate( [ '/tabs/home' ] )
  }
}
