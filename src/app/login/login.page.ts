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
import { Store } from '@ngrx/store'
import { match } from 'oxide.ts'
import { AppState } from 'src/app/shared/state'
import {
  CheckboxComponent,
  FilledButtonComponent,
  InputTextComponent,
  LogoComponent,
  OutlinedButtonComponent
} from 'src/app/shared/components'
import { AuthService } from 'src/app/shared/services'

@Component( {
  standalone : true,
  selector   : 'app-login',
  templateUrl: './login.page.html',
  imports    : [
    LogoComponent,
    InputTextComponent,
    RouterLink,
    CheckboxComponent,
    FilledButtonComponent,
    OutlinedButtonComponent,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls  : [ './login.page.scss' ]
} )
// controller
export class LoginPage implements ViewDidEnter {

  constructor(
    private store: Store<AppState>,
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

    const result = await this.authService.login(
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
