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
  ToastController,
  ViewDidEnter
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { RadioInputComponent } from 'src/app/shared/components/radio-input/radio-input.component'
import { SingleSelectorInputComponent } from 'src/app/shared/components/single-selector-input/single-selector-input.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { CountryPhoneCodeService } from 'src/app/shared/services/country-phone-code.service'
import { AppState } from 'src/app/shared/state/app.state'
import { notifyStep } from 'src/app/shared/state/stepper/step.actions'
import { RadioButtonData } from 'src/package/shared/domain/components/radio-button-data'
import { SingleSelectorData } from 'src/package/shared/domain/components/single-selector-data'

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
    private toastController: ToastController,
    private countryService: CountryPhoneCodeService,
    private auth: AuthService,
    private router: Router )
  {
    this.countryService.countriesList$.subscribe(
      ( countries ) => {
        this.countries = countries.map( ( country ): SingleSelectorData =>
          ( {
            id      : country.code.value,
            name    : country.name.common,
            image   : country.flag.png,
            selected: false
          } ) )
      }
    )
  }

  @ViewChild( 'user' ) userInput !: InputTextComponent
  @ViewChild( 'lastName' ) lastNameInput !: InputTextComponent
  @ViewChild( 'phone' ) phoneInput !: InputTextComponent
  @ViewChild( 'country' ) countryInput !: SingleSelectorInputComponent
  @ViewChild( 'date' ) dateSelectorInput !: DateSelectorComponent
  @ViewChild( 'radio' ) radioButtonInput !: RadioInputComponent

  countries: SingleSelectorData[] = []

  genderButtonsInfo: RadioButtonData[] = [
    {
      name: 'Male',
      icon: 'male-outline'
    },
    {
      name: 'Female',
      icon: 'female-outline'
    },
    {
      name: 'None',
      icon: 'male-female-outline'
    }
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
    const result = await this.auth.registerPassenger( {
      name    : this.userInput.textControl.value!,
      lastName: this.lastNameInput.textControl.value!,
      phone   : this.phoneInput.textControl.value!,
      country : this.countryInput.singleSelectorControl.value!,
      birthDay: this.dateSelectorInput.dateControl.value!,
      gender  : this.radioButtonInput.radioControl.value!
    } )

    if ( result ) {
      await this.router.navigate( [ '/register/step3' ] )
    }
    else {
      await this.presentToast('Hubo un problema. Intente denuevo')
    }
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
