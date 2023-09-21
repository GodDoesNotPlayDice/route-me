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
          z.string()
           .email()
           .parse( control.value )
        }
        catch ( e ) {
          return { email: true }
        }
        break
      case 'password':
        control.addValidators( Validators.minLength( 8 ) )
        break
      case 'text':
        control.addValidators( Validators.minLength( 3 ) )
        break
      case 'phone':
        control.addValidators( Validators.minLength( 8 ) )
        control.addValidators( Validators.maxLength( 9 ) )
        try {
          const numberParsed = Number.parseInt( control.value )
          z.number()
           .parse( numberParsed )
        }
        catch ( e ) {
          return { number: true }
        }
        break
      case 'number':
        try {
          const numberParsed = Number.parseInt( control.value )
          z.number()
           .parse( numberParsed )
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
