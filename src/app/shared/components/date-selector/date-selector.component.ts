import {
  Component,
  Input
} from '@angular/core'
import {
  FormControl,
  Validators
} from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent {

  @Input() isValidDate: boolean = false
  _date: Date                   = new Date()
  readonly dateControl          = new FormControl( false, control => {
    if ( !this.isValidDate ) {
      control.addValidators( Validators.requiredTrue )
      return { required: true }
    }
    return null
  } )

  onDate(event : MatDatepickerInputEvent<Date>) {
    this.isValidDate = event.value !== null;
    this.dateControl.patchValue( this.isValidDate )
    this.dateControl.updateValueAndValidity()
  }
}
