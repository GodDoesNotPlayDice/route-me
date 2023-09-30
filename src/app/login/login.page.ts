import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild
} from '@angular/core'
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import {
  Router,
  RouterLink
} from '@angular/router'
import {
  AlertController,
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { match } from 'oxide.ts'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
import { LogoComponent } from 'src/app/shared/components/logo/logo.component'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component( {
  standalone : true,
  selector   : 'app-login',
  templateUrl: './login.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    LogoComponent,
    InputTextComponent,
    RouterLink,
    CheckboxComponent,
    FilledButtonComponent,
    OutlinedButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls  : [ './login.page.scss' ]
} )
export class LoginPage implements ViewDidEnter {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  @ViewChild( 'user' ) userInput!: InputTextComponent
  @ViewChild( 'password' ) passwordInput!: InputTextComponent
  @ViewChild( 'check' ) checkbox!: CheckboxComponent

  formGroup!: FormGroup

  async presentAlert() {
    const alert = await this.alertController.create( {
      header   : 'Error',
      subHeader: 'Credenciales no existen',
      message  : '',
      buttons  : [ 'OK' ]
    } )

    await alert.present()
  }

  ionViewDidEnter() {
    //TODO: ver si colocar div dentro de backButton u manual, responde click
    // this.store.dispatch( clearUserRegister() )

    this.formGroup = new FormGroup( [
      this.userInput.textControl,
      this.passwordInput.textControl
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

    // si el checkbox esta marcado
    // this.checkbox.checkboxControl.value

    const result = await this.authService.userLogin(
      this.userInput.textControl.value!,
      this.passwordInput.textControl.value!
    )

    const response = match( result, {
      Ok : ( value: boolean ) => {
        this.router.navigate( [ '/tabs' ] )
        return 'exito'
      },
      Err: ( error: string ) => {
        this.presentAlert()
        return 'error msg'
      }
    } )
  }
}
