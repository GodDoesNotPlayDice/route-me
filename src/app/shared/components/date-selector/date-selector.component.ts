import {
  Component,
  Input
} from '@angular/core'
import {
  FormControl,
  Validators
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'

@Component( {
  selector   : 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls  : [ './date-selector.component.scss' ]
} )
export class DateSelectorComponent {

  dateSelected: Date | null = null

  date18YearsAgo: Date = new Date( new Date().setFullYear( new Date().getFullYear() - 18 ) )

  dateNow: Date        = new Date()
  readonly dateControl = new FormControl<Date | null>( null, control => {
    if ( this.dateSelected === null ) {
      control.addValidators( Validators.requiredTrue )
      return { required: true }
    }

    if ( this.dateSelected > this.date18YearsAgo ) {
      return { invalid: true }
      }

    return null
  } )

  onDate( event: MatDatepickerInputEvent<Date> ) {
    this.dateSelected = event.value
    this.dateControl.patchValue( this.dateSelected )
    this.dateControl.markAllAsTouched()
    this.dateControl.updateValueAndValidity()
  }
}
