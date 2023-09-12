import {
  Component,
  ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ViewDidEnter } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements ViewDidEnter{

  constructor(private store : Store<AppState>) {
  }

  @ViewChild('user') userInput!: InputTextComponent
  @ViewChild('password') passwordInput!: InputTextComponent
  @ViewChild('confirmpassword') passwordConfirmInput!: InputTextComponent
  @ViewChild( 'check') checkbox!: CheckboxComponent

  formGroup! : FormGroup

  public submit( $event: SubmitEvent ): void {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if(
      !this.formGroup.valid
    ) return

    console.log('this.formGroup.value');
    console.log(this.formGroup.value);

    console.log("step 1 check")
    this.store.dispatch(notifyStep())
  }

  ionViewDidEnter() {
    this.formGroup = new FormGroup([
      this.userInput.textControl,
      this.passwordInput.textControl,
      this.passwordConfirmInput.textControl,
      this.checkbox.checkboxControl
    ])
  }
}
