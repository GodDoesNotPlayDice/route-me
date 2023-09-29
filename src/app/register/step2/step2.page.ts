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
import {
  CountrySelectorBarComponent,
  DateSelectorComponent,
  FilledButtonComponent,
  InputTextComponent,
  RadioButtonComponent,
  StepperComponent
} from 'src/app/shared/components'
import {
  newRadioButtonData,
  RadioButtonData
} from 'src/app/shared/models'
import {
  AppState,
  notifyStep
} from 'src/app/shared/state'

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
      name: 'Hombre',
      icon: 'male-outline'
    } ),
    newRadioButtonData( {
      name: 'Mujer',
      icon: 'female-outline'
    } )
  ]
  // buttons : RadioButtonData[] = [
  //   {
  //     name: "Hombre",
  //     icon: "male-outline"
  //   },
  //   {
  //     name: "Mujer",
  //     icon: "female-outline"
  //   },
  // ]

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

    //TODO: enviar datos al passenger
    // this.store.dispatch( updateUserRegister( {
    //   name    : this.userInput.textControl.value!,
    //   lastName: this.lastNameInput.textControl.value!,
    //   phone   : this.phoneInput.textControl.value!,
    //   country : this.countryInput.countryControl.value!,
    //   birthDay: this.dateSelectorInput.dateControl.value!,
    //   genre   : this.radioButtonInput.radioControl.value!
    // } ) )
    this.store.dispatch( notifyStep() )
    await this.router.navigate( [ '/register/step4' ] )
  }
}
