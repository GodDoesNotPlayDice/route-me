import {
  Component,
  Input,
} from '@angular/core'
import {
  FormControl,
  Validators
} from '@angular/forms'
import { z } from 'zod'

type InputTextType = 'email' | 'password' | 'text'

@Component( {
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: [ './input-text.component.scss' ]
} )
export class InputTextComponent{

  readonly textControl = new FormControl( '', control => {
    control.addValidators( Validators.required )
    switch ( this.type ) {
      case 'email':
        try {
          z.string()
           .email()
           .parse( control.value )
        }
        catch (e) {
          return { email : true}
        }
        break;
      case "password":
        control.addValidators(Validators.minLength(8))
        break
       case "text":
        control.addValidators(Validators.minLength(3))
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
