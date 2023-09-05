import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core'
import {
  FormControl,
  Validators
} from '@angular/forms'

@Component( {
  selector   : 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls  : [ './checkbox.component.scss' ]
} )
export class CheckboxComponent {

  @Input() activeError: boolean = false

  @Input() isChecked: boolean = false

  @Input() errorText: string = ''

  @Input() contentText: string = ''

  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  readonly checkboxControl = new FormControl( false, control => {
    if ( this.activeError && !control.value ) {
      control.addValidators( Validators.requiredTrue )
      return { required: true }
    }
    return null
  } )

  onCheckboxChange(): void {
    this.isChecked = !this.isChecked
    this.isCheckedChange.emit( this.isChecked )
    this.checkboxControl.patchValue( this.isChecked )
    this.checkboxControl.updateValueAndValidity()
  }
}
