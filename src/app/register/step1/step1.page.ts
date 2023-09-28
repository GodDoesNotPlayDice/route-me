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
  AppState,
  notifyStep,
  updateUserRegister
} from 'src/app/shared/state'
import { CheckboxComponent,
  FilledButtonComponent, InputTextComponent,
  OutlinedButtonComponent, StepperComponent } from 'src/app/shared/components'

@Component( {
  standalone : true,
  selector   : 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls  : [ './step1.page.scss' ],
  imports    : [
    IonicModule,
    StepperComponent,
    OutlinedButtonComponent,
    InputTextComponent,
    CheckboxComponent,
    FilledButtonComponent,
    FormsModule,
    CommonModule
  ]
} )
export class Step1Page implements ViewDidEnter {

  constructor( private store: Store<AppState>,
    private router: Router )
  {}

  @ViewChild( 'user' ) userInput!: InputTextComponent
  @ViewChild( 'password' ) passwordInput!: InputTextComponent
  @ViewChild( 'confirmpassword' ) passwordConfirmInput!: InputTextComponent
  @ViewChild( 'check' ) checkbox!: CheckboxComponent

  formGroup!: FormGroup
  checkerGroup: FormGroup | undefined

  async submit( $event: SubmitEvent ): Promise<void> {
    $event.preventDefault()
    this.checkerGroup?.updateValueAndValidity()
    this.checkerGroup?.markAllAsTouched()
    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if (
      !this.formGroup.valid
    )
    {
      return
    }

    this.store.dispatch( updateUserRegister( {
      email   : this.userInput.textControl.value!,
      password: this.passwordInput.textControl.value!
    } ) )
    this.store.dispatch( notifyStep() )
    await this.router.navigate( [ '/register/step2' ] )
  }

  ionViewDidEnter() {
    this.checkerGroup = new FormGroup( {
      pw1: this.passwordInput.textControl,
      pw2: this.passwordConfirmInput.textControl
    }, control => {
      if ( control.value.pw1 !== control.value.pw2 ) {
        return { password: true }
      }
      return null
    } )

    this.formGroup = new FormGroup( [
      this.userInput.textControl,
      this.checkerGroup,
      this.checkbox.checkboxControl
    ] )
  }
}
