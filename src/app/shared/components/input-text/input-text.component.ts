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
import { newPassengerPhone } from 'src/package/passenger/domain/models/passenger-phone'
import {
  newUserEmail,
  newUserPassword
} from 'src/package/user'
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
    switch ( this.type ) {
      case 'email':
        try {
          newUserEmail( {
            value: control.value
          } )
        }
        catch ( e ) {
          return { email: true }
        }
        break
      case 'password':
        try {
          newUserPassword( {
            value: control.value
          } )
        }
        catch ( e: any ) {
          return {
            minlength: {
              requiredLength: e?.issues?.[0]?.['minimum']
            }
          }
        }
        break
      case 'text':
        control.addValidators( Validators.minLength( 3 ) )
        break
      case 'phone':
        try {
          //TODO: revisar data zodIssue min y max
          z.number()
           .min( 8 )
           .max( 9 )
           .parse( Number.parseInt( control.value ) )
          newPassengerPhone( {
            value: control.value
          } )
        }
        catch ( e ) {
          return { number: true }
        }
        break
      case 'number':
        try {
          z.number()
           .parse( Number.parseInt( control.value ) )
        }
        catch ( e ) {
          return { number: true }
        }
        break
    }
    return null
  } )

  @Input() type: InputTextType = 'text'
  @Input() placeholder: string = ''

  public input( $event: Event ): void {
    this.textControl.updateValueAndValidity()
  }
}
