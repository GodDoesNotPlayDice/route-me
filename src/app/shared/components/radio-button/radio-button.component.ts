import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
} from '@angular/core'
import {
  FormControl
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { RadioButtonData } from 'src/app/shared/models/RadioButtonData'

@Component( {
  standalone: true,
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: [ './radio-button.component.scss' ],
  imports: [
    IonicModule,
    CommonModule
  ]
} )
export class RadioButtonComponent {
  @Input({required:true}) radioButtons: RadioButtonData[] = []
  @Input({required:true}) name!: string

  readonly radioControl = new FormControl( '', control => {
      if ( control.value === '' ){
        return { required: true }
      }
      return null
    }
  )

  onRadioChange( $event: Event ) {
    if ( $event.target instanceof HTMLInputElement ) {
      this.radioControl.patchValue( $event.target.value)
    }
    else {
      this.radioControl.patchValue( '')
    }
    this.radioControl.updateValueAndValidity()
  }
}
