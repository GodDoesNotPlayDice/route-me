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
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { LogoComponent } from 'src/app/shared/components/logo/logo.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
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
  )
  {}

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

  async ionViewDidEnter() {
    const result = await ejecutarPromesas()

    if ( result.isErr() ) {
      console.log( result.unwrapErr() )
    }else {
      console.log( result.unwrap() )
    }


    //TODO: ver si colocar div dentro de backButton u manual, responde click
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

    // const response = match( result, {
    //   Ok : ( value: boolean ) => {
    //     this.router.navigate( [ '/tabs' ] )
    //     return 'exito'
    //   },
    //   Err: ( error: string ) => {
    //     this.presentAlert()
    //     return 'error msg'
    //   }
    // } )
  }
}

async function ejecutarPromesas() : Promise<Result<number, string[]>> {
  const resultados       = await Promise.allSettled(
    [ funcionAsincrona1(), funcionAsincrona2(),
      funcionAsincrona3() ]
  )
  const errors: string[] = []
  let sum = 0
  resultados.forEach( ( resultado, index ) => {
    if ( resultado.status === 'fulfilled' ) {
      console.log( `Promesa ${ index + 1 } se resolvió con resultado:`,
        resultado.value )
      sum += (typeof resultado.value === "number" ? resultado.value : 0)
    }
    else if ( resultado.status === 'rejected' ) {
      console.log( `Promesa ${ index + 1 } fue rechazada con error:`,
        resultado.reason instanceof Error
          ? resultado.reason.name
          : 'other' )
      errors.push( resultado.reason instanceof Error
        ? resultado.reason.name
        : 'other' )
    }
  } )

  if ( errors.length > 0 ) {
    return Promise.resolve(Err(errors))
  }

  return Promise.resolve(Ok(sum))
}

class CustomError extends Error {
  constructor( message: string ) {
    super( `Lorem "${ message }" ipsum dolor.` )
    this.name = 'CustomError'
  }
}

class OtherError extends Error {
  constructor( message: string ) {
    super( `Lorem "${ message }" ipsum dolor.` )
    this.name = 'OtherError'
  }
}

function funcionAsincrona1() {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
      resolve( 1 )
    }, 1000 )
  } )
}

function funcionAsincrona2() {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
      resolve( 2 )
      // reject( new CustomError( 'Error en la promesa 2' ) )
    }, 1500 )
  } )
}

function funcionAsincrona3() {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
      resolve( 2 )
    }, 2000 )
  } )
}
