import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core'
import {
  MatDatepickerInputEvent,
  MatDatepickerModule
} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { IonicModule } from '@ionic/angular'

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
  @ViewChild( 'dateInput', { static: true } ) dateInput!: HTMLInputElement
  @Input( { required: true } ) label: string
  @Input() mustAdult: boolean = false

  date18YearsAgo: Date = new Date(
    new Date().setFullYear( new Date().getFullYear() - 18 ) )

  dateNowDesc: Date | null  = null
  dateNowAsc: Date | null   = null
  dateSelected: Date | null = null
  readonly dateControl      = new FormControl<Date | null>( null, control => {
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

  onDate( event: MatDatepickerInputEvent<Date> ) {
    this.dateSelected = event.value
    this.dateControl.patchValue( this.dateSelected )
    this.dateControl.markAllAsTouched()
    this.dateControl.updateValueAndValidity()
  }

  reset(): void {
    this.dateSelected = null
    this.dateControl.patchValue( this.dateSelected )
    this.dateControl.updateValueAndValidity()
  }
}
