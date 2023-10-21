import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component( {
  standalone : true,
  selector   : 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls  : [ './reset-password.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    InputTextComponent,
    FilledButtonComponent
  ]
} )
export class ResetPasswordPage implements ViewDidEnter {

  constructor( private router: Router,
    private auth: AuthService )
  {}

  @ViewChild( 'user' ) emailInput!: InputTextComponent
  formGroup!: FormGroup

  async ionViewDidEnter(): Promise<void> {
    this.formGroup = new FormGroup( [
      this.emailInput.textControl
    ] )
  }

  async buttonClick(): Promise<void> {
    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if (
      !this.formGroup.valid
    )
    {
      return
    }

    const result = await this.auth.resetPasswordSend(
      this.emailInput.textControl.value! )

    if ( result ) {
      await this.router.navigate( [ '/login' ] )
    }
    else {
      console.log( 'reset failed' )
    }
  }
}
