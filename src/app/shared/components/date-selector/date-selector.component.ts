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
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker'
import {
  DatetimeCustomEvent,
  IonicModule
} from '@ionic/angular'
import { dateDifference } from 'src/package/shared/config/helper/date/date-mapper'
import {
  Unit,
  UnitEnum
} from 'src/package/shared/config/helper/date/unit'

@Component( {
  standalone : true,
  selector   : 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls  : [ './date-selector.component.scss' ],
  imports: [
    IonicModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule
  ]
} )
export class DateSelectorComponent implements OnInit {

  dateSelected: Date | null = null
  @Input() label: string      = 'Fecha de nacimiento'
  @Input() mustAdult: boolean = true

  date18YearsAgo: Date = new Date(
    new Date().setFullYear( new Date().getFullYear() - 18 ) )

  dateNowDesc: Date | null = null
  dateNowAsc: Date | null  = null
  readonly dateControl        = new FormControl<Date | null>( null, control => {
    if ( this.dateSelected === null ) {
      return { required: true }
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

  onDate( event: MatDatepickerInputEvent<Date>  ) {
    this.dateSelected = event.value
    this.dateControl.patchValue( this.dateSelected )
    this.dateControl.markAllAsTouched()
    this.dateControl.updateValueAndValidity()
  }

  public onTime( $event: DatetimeCustomEvent ): void {
    console.log( '$event' )
    const date = new Date( $event.detail.value as string)
    console.log( date)
    // const hhMM = date.toJSON().split('T')[1].slice(0,5)
    // const hmSplit    = hhMM.split(':')
    // const h          = hmSplit[0]
    // const m          = hmSplit[1]
    // console.log( hhMM )
    // console.log( hmSplit )
    // console.log( h )
    // console.log( m )
    // const n = new Date(2023, 10, 6, 20, 50)
    // console.log(n)
    // console.log(n.toJSON())
    console.log('----------')
    console.log(date.toJSON())
  }
}
