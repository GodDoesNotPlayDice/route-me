import {
  Component,
  ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import {
  IonBackButton,
  ViewDidEnter
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'
import {
  clearUserRegister,
  updateUserRegister
} from 'src/app/state/user-register/user-register.actions'

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements ViewDidEnter{

  constructor(private store : Store<AppState>,
    private router : Router) {}

  @ViewChild('user') userInput!: InputTextComponent
  @ViewChild('password') passwordInput!: InputTextComponent
  @ViewChild('confirmpassword') passwordConfirmInput!: InputTextComponent
  @ViewChild( 'check') checkbox!: CheckboxComponent

  formGroup! : FormGroup
  checkerGroup : FormGroup | undefined

  async submit( $event: SubmitEvent ): Promise<void> {
    $event.preventDefault()
    this.checkerGroup?.updateValueAndValidity()
    this.checkerGroup?.markAllAsTouched()
    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if(
      !this.formGroup.valid
    ) return

    this.store.dispatch(updateUserRegister({
      email: this.userInput.textControl.value!,
      password: this.passwordInput.textControl.value!
    }))
    this.store.dispatch(notifyStep())
    await this.router.navigate(['/register/step2'])
  }

  ionViewDidEnter() {
    this.checkerGroup = new FormGroup({
      pw1: this.passwordInput.textControl,
      pw2: this.passwordConfirmInput.textControl,
  }, control => {
      if (control.value.pw1 !== control.value.pw2) {
        return { password: true }
      }
      return null
    })

    this.formGroup = new FormGroup([
      this.userInput.textControl,
      this.checkerGroup,
      this.checkbox.checkboxControl
    ])
  }
}
