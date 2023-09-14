import {
  Component, Input, OnInit
} from '@angular/core'
import {
  FormControl,
} from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'

@Component( {
  selector   : 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls  : [ './date-selector.component.scss' ]
} )
export class DateSelectorComponent implements OnInit{

  dateSelected: Date | null = null
  @Input() label : string = "Fecha de nacimiento"
  @Input() desc : boolean = true

  date18YearsAgo: Date = new Date( new Date().setFullYear( new Date().getFullYear() - 18 ) )

  dateNowDesc: Date | null = null
  dateNowAsc: Date | null = null
  readonly dateControl = new FormControl<Date | null>( null, control => {
    if ( this.dateSelected === null ) {
      return { required: true }
    }
    if (this.desc && this.dateSelected > this.date18YearsAgo ) {
      return { invalid: true }
    }
    return null
  } )

  ngOnInit() {
    this.dateNowDesc = this.desc ? new Date() : null
    this.dateNowAsc = this.desc ? null : new Date()
  }

  onDate( event: MatDatepickerInputEvent<Date> ) {
    this.dateSelected = event.value
    this.dateControl.patchValue( this.dateSelected )
    this.dateControl.markAllAsTouched()
    this.dateControl.updateValueAndValidity()
  }
}
