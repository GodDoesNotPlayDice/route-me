import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { PhoneExceedsMaximumLengthException } from 'src/package/shared/domain/exceptions/phone-exceeds-maximum-length-exception'
import { PhoneInsufficientLengthException } from 'src/package/shared/domain/exceptions/phone-insufficient-length-exception'
import { newPassengerPhone } from 'src/package/passenger/domain/models/passenger-phone'
import { PasswordInsufficientCharacterException } from 'src/package/shared/domain/exceptions/password-insufficient-character-exception'
import { PasswordInsufficientLengthException } from 'src/package/shared/domain/exceptions/password-insufficient-length-exception'
import { PasswordInsufficientLowercaseException } from 'src/package/shared/domain/exceptions/password-insufficient-lowercase-exception'
import { PasswordInsufficientNumberException } from 'src/package/shared/domain/exceptions/password-insufficient-number-exception'
import { PasswordInsufficientUppercaseException } from 'src/package/shared/domain/exceptions/password-insufficient-uppercase-exception'
import { newUserEmail } from 'src/package/shared/domain/models/email'
import { newUserPassword } from 'src/package/shared/domain/models/password'
import { z } from 'zod'

type InputTextType = 'email' | 'password' | 'text' | 'phone' | 'number'

@Component( {
  standalone : true,
  selector   : 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls  : [ './input-text.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
} )
export class InputTextComponent {
  readonly textControl = new FormControl( '', control => {

    control.addValidators( Validators.required )
    if ( this.disableErrors ) {
      return null
    }
    switch ( this.type ) {
      case 'email':
        const emailResult = newUserEmail( {
          value: control.value
        } )
        if ( emailResult.isErr() ) {
          return { email: true }
        }
        break
      case 'password':
        const passwordResult = newUserPassword( {
          value: control.value
        } )
        if ( passwordResult.isErr() ) {
          let map: any = {}
          for ( const error of passwordResult.unwrapErr() ) {
            if ( error instanceof PasswordInsufficientUppercaseException ) {
              map['uppercase'] = true
            }
            else if ( error instanceof
              PasswordInsufficientLowercaseException )
            {
              map['lowercase'] = true
            }
            else if ( error instanceof PasswordInsufficientNumberException ) {
              map['number'] = true
            }
            else if ( error instanceof
              PasswordInsufficientCharacterException )
            {
              map['character'] = true
            }
            else if ( error instanceof
              PasswordInsufficientLengthException )
            {
              map['minlength'] = {
                requiredLength: error.message
              }
            }
          }
          return map
        }
        break
      case 'text':
        control.addValidators( Validators.minLength( 3 ) )
        break
      case 'phone':
        const phoneResult = newPassengerPhone( {
          value: control.value
        } )
        if ( phoneResult.isErr() ) {
          let map: any = {}
          for ( let error of phoneResult.unwrapErr() ) {
            if ( error instanceof PhoneInsufficientLengthException ) {
              map['minlength'] = {
                requiredLength: error.message
              }
            }
            else if ( error instanceof PhoneExceedsMaximumLengthException ) {
              map['maxlength'] = {
                requiredLength: error.message
              }
            }
            else {
              map['int'] = true
            }
          }
          return map
        }
        break
      case 'number':
        try {
          z.number()
           .parse( Number.parseInt( control.value ) )
        }
        catch ( e ) {
          return { int: true }
        }
        break
    }
    return null
  } )

  @Input() type: InputTextType    = 'text'
  @Input() focusLabel: boolean    = false
  @Input() disableErrors: boolean = false
  @Input() value: string          = ''
  @Input( { required: true } ) placeholder: string

  public input( $event: Event ): void {
    this.textControl.updateValueAndValidity()
  }

  reset(): void {
    this.value = ''
    this.textControl.reset()
  }
}
