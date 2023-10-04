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
  match,
  Ok,
  Result
} from 'oxide.ts'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { LogoComponent } from 'src/app/shared/components/logo/logo.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import {
  newPassengerID,
  PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import {
  newPassengerName,
  PassengerName
} from 'src/package/passenger/domain/models/passenger-name'

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
    // const result = await newPassenger({
    //   id: '123a',
    //   userID: newUserID({
    //     value: '123'
    //   }),
    //   name: 'adadasd',
    //   lastName: 'adadasd',
    //   description: '',
    //   phone: '123456789',
    //   birthDay: new Date('2000-01-01'),
    //   country: 'a',
    //   gender: newGender({
    //     value: 'Male'
    //   }),
    //   preferences: []
    // })
    // if ( result.isErr() ) {
    //   console.log( result.unwrapErr() )
    // }else {
    //   console.log( result.unwrap() )
    // }

    // const r = await waitPromises<Passenger>( [
    //   wrapPromise<PassengerID>( () => newPassengerID( {
    //     value: 'id'
    //   } ), 'id' ),
    //   wrapPromise<PassengerName>( () => newPassengerName( {
    //       value: 'name'
    //     } ),
    //     'name' )
    // ] )
    //
    // if ( r.isErr() ) {
    //   console.log( r.unwrapErr() )
    // }
    // else {
    //   const passenger: Passenger = r.unwrap()
    //   console.log( 'passenger')
    //   //TODO: se pierde key, ver como mantenerla en el bucle de waitPromises
    //   console.log( passenger )
    //
    // }
    // console.log( 'un' )

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

async function waitPromises<Y>( promises: Promise<any>[] ): Promise<Result<Y, string[]>> {
  const results = await Promise.allSettled( promises )

  const errors: string[] = []
  let values: any[]     = []
  results.forEach( ( result ) => {
    if ( result.status === 'rejected' ) {
      errors.push( result.reason instanceof Error
        ? result.reason.message
        : 'unknown error' )
    }
    else {
      values.push( result.value.unwrap() )
    }
  } )

  if ( errors.length > 0 ) {
    return Err( errors )
  }
  const val: Y = {
    ...values
  } as Y
  return Ok( val )
}

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
function wrapPromise<X>( fn: () => X, key: string ): Promise<Result<X, Error>> {
  return new Promise<Result<X, Error>>(
    ( resolve, reject ): Result<X, Error> => {
      try {
        const result = fn()
        resolve( Ok( result ) )
        console.log( 'wrap', result )
        return Ok( result)
      }
      catch ( error ) {
        const e = error instanceof Error ? error : new Error( 'unknown error' )
        reject( Err( e ) )
        return Err( e )
      }
    } )
}
