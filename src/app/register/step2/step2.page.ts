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
import { SingleSelectorInputComponent } from 'src/app/shared/components/single-selector-input/single-selector-input.component'
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { RadioInputComponent } from 'src/app/shared/components/radio-input/radio-input.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { Country } from 'src/app/shared/models/country/domain/country'
import {
  newRadioButtonData,
  RadioButtonData
} from 'src/app/shared/models/radio-button-data'
import {
  newSingleSelectorData,
  SingleSelectorData
} from 'src/app/shared/models/single-selector-data'
import { AuthService } from 'src/app/shared/services/auth.service'
import { CountryPhoneCodeService } from 'src/app/shared/services/country-phone-code.service'
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
    SingleSelectorInputComponent,
    DateSelectorComponent,
    RadioInputComponent,
    FilledButtonComponent,
    FormsModule,
    CommonModule
  ]
} )
export class Step2Page implements ViewDidEnter {

  constructor( private store: Store<AppState>,
    private countryService : CountryPhoneCodeService,
    private auth : AuthService,
    private router: Router )
  {
    this.countries = this.countryService.countriesList.map( country => {
      return newSingleSelectorData({
        id: country.code.value,
        name: country.name.common,
        image: country.flag.png,
        selected: false
      })
    })
  }

  @ViewChild( 'user' ) userInput !: InputTextComponent
  @ViewChild( 'lastName' ) lastNameInput !: InputTextComponent
  @ViewChild( 'phone' ) phoneInput !: InputTextComponent
  @ViewChild( 'country' ) countryInput !: SingleSelectorInputComponent
  @ViewChild( 'date' ) dateSelectorInput !: DateSelectorComponent
  @ViewChild( 'radio' ) radioButtonInput !: RadioInputComponent

  readonly countries : SingleSelectorData[] = []

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
      this.countryInput.singleSelectorControl,
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
      country: this.countryInput.singleSelectorControl.value!,
      birthDay: this.dateSelectorInput.dateControl.value!,
      gender: this.radioButtonInput.radioControl.value!
    })
    await this.router.navigate( [ '/register/step3' ] )
  }
}
