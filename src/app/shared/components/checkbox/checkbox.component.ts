import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import {
  FormControl,
  Validators
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls  : [ './checkbox.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class CheckboxComponent implements OnInit {

  @Input() activeError: boolean

  isChecked: boolean = false

  @Input() errorText: string

  @Input({required: true}) contentText: string = ''

  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  readonly checkboxControl = new FormControl( false, control => {
    if ( this.activeError && !control.value ) {
      return { required: true }
    }
    return null
  } )

  onCheckboxChange(): void {
    this.isChecked = !this.isChecked
    this.isCheckedChange.emit( this.isChecked )
    this.checkboxControl.patchValue( this.isChecked )
    this.checkboxControl.updateValueAndValidity()
    this.checkboxControl.markAllAsTouched()
  }

  public ngOnInit(): void {
    this.checkboxControl.updateValueAndValidity()
  }
}
