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
import { CountrySelectorBarComponent } from 'src/app/shared/components/country-selector-bar/country-selector-bar.component'
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { RadioButtonComponent } from 'src/app/shared/components/radio-button/radio-button.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import {
  newRadioButtonData,
  RadioButtonData
} from 'src/app/shared/models/radio-button-data'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AppState } from 'src/app/shared/state/app.state'
import { notifyStep } from 'src/app/shared/state/stepper/step.actions'

@Component( {
  standalone : true,
  selector   : 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls  : [ './step2.page.scss' ],
  imports    : [
    IonicModule,
    StepperComponent,
    InputTextComponent,
    CountrySelectorBarComponent,
    DateSelectorComponent,
    RadioButtonComponent,
    FilledButtonComponent,
    FormsModule,
    CommonModule
  ]
} )
export class Step2Page implements ViewDidEnter {

  constructor( private store: Store<AppState>,
    private auth : AuthService,
    private router: Router )
  {}

  @ViewChild( 'user' ) userInput !: InputTextComponent
  @ViewChild( 'lastName' ) lastNameInput !: InputTextComponent
  @ViewChild( 'phone' ) phoneInput !: InputTextComponent
  @ViewChild( 'country' ) countryInput !: CountrySelectorBarComponent
  @ViewChild( 'date' ) dateSelectorInput !: DateSelectorComponent
  @ViewChild( 'radio' ) radioButtonInput !: RadioButtonComponent

  buttons: RadioButtonData[] = [
    newRadioButtonData( {
      name: 'Male',
      icon: 'male-outline'
    } ),
    newRadioButtonData( {
      name: 'Female',
      icon: 'female-outline'
    } )
  ]

  formGroup!: FormGroup

  ionViewDidEnter() {
    this.formGroup = new FormGroup( [
      this.userInput.textControl,
      this.lastNameInput.textControl,
      this.phoneInput.textControl,
      this.countryInput.countryControl,
      this.dateSelectorInput.dateControl,
      this.radioButtonInput.radioControl
    ] )
  }

  async submit( $event: SubmitEvent ) {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if (
      !this.formGroup.valid
    )
    {
      return
    }

    this.store.dispatch( notifyStep() )
    await this.auth.registerPassenger({
      name: this.userInput.textControl.value!,
      lastName: this.lastNameInput.textControl.value!,
      phone: this.phoneInput.textControl.value!,
      country: this.countryInput.countryControl.value!,
      birthDay: this.dateSelectorInput.dateControl.value!,
      gender: this.radioButtonInput.radioControl.value!
    })
    await this.router.navigate( [ '/register/step4' ] )
  }
}
