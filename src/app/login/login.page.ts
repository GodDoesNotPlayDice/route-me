import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit,
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
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { LogoComponent } from 'src/app/shared/components/logo/logo.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
import { AppState } from 'src/app/state/app.state'
import { clearUserRegister } from 'src/app/state/user-register/user-register.actions'
import { GetAllUsers } from 'src/package/user'
import { AuthService } from '../services/auth/auth.service'
import { CheckboxComponent } from '../shared/components/checkbox/checkbox.component'


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
export class LoginPage implements ViewDidEnter, OnInit {

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private get: GetAllUsers
  )
  {}

  async ngOnInit() {
    await this.get.execute()

  }

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
    this.store.dispatch( clearUserRegister() )

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
