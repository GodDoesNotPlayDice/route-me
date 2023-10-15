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

@Component( {
  standalone : true,
  selector   : 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls  : [ './input-area.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
} )
export class InputAreaComponent {
  @Input() title: string       = 'Sobre Mi'
  @Input() placeholder: string = ''
  @Input() label: string       = ''

  readonly textControl = new FormControl( '', control => {
    // control.addValidators( Validators.required )
    // control.addValidators( Validators.minLength( 5 ) )
    return null
  } )

  onChange() {
    this.textControl.updateValueAndValidity()
  }
}
