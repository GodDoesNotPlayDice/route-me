import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  OnInit
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core'
import {
  MatDatepickerInputEvent,
  MatDatepickerModule
} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import {
  DatetimeCustomEvent,
  IonicModule
} from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls  : [ './date-selector.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
} )
export class DateSelectorComponent implements OnInit {

  dateSelected: Date | null   = null
  @Input( { required: true } ) label: string
  @Input() mustAdult: boolean = false

  date18YearsAgo: Date = new Date(
    new Date().setFullYear( new Date().getFullYear() - 18 ) )

  dateNowDesc: Date | null = null
  dateNowAsc: Date | null  = null


  readonly dateControl = new FormControl<Date | null>( null, control => {
    if ( this.dateSelected === null ) {
      return { required: true }
    }
    const date2min = new Date(
      new Date().getTime() + ( 2 * 60 * 1000 ) )

    if ( date2min > this.dateSelected  ) {
      return {
        limit: true
      }
    }
    if ( this.mustAdult && this.dateSelected > this.date18YearsAgo ) {
      return { invalid: true }
    }
    return null
  } )

  ngOnInit() {
    this.dateNowDesc = this.mustAdult ? new Date() : null
    this.dateNowAsc  = this.mustAdult ? null : new Date()
  }

  onDate( event: MatDatepickerInputEvent<Date> ) {
    this.dateSelected = event.value
    this.dateControl.patchValue( this.dateSelected )
    this.dateControl.markAllAsTouched()
    this.dateControl.updateValueAndValidity()
  }

  public onTime( $event: DatetimeCustomEvent ): void {
    if ( this.dateSelected !== null ) {
      const date = new Date( $event.detail.value as string )
      this.dateSelected = new Date(
        this.dateSelected.getFullYear(),
        this.dateSelected.getMonth(),
        this.dateSelected.getDate(),
        date.getHours(),
        date.getMinutes()
      )
      this.dateControl.patchValue( this.dateSelected )
    }

    this.dateControl.markAllAsTouched()
    this.dateControl.updateValueAndValidity()
  }
}
