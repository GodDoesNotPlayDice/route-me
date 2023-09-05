import {
  Component,
  ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ViewDidEnter } from '@ionic/angular'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements ViewDidEnter{

  @ViewChild('pw1') password1Input!: InputTextComponent
  @ViewChild('pw2') password2Input!: InputTextComponent
  // formGroup! : FormGroup

  public ionViewDidEnter(): void {
    // this.formGroup = new FormGroup([
    //   this.password1Input.textControl,
    //   this.password2Input.textControl
    // ],{
    //   validators: (control) => {
    //     const password1 = control.get('pw1')?.value
    //     const password2 = control.get('pw2')?.value
    //     if(password1 === password2) return null
    //     return { passwordMatch: true }
    //   }
    // })
  }

}
