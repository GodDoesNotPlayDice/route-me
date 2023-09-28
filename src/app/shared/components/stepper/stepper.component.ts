import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import {
  AppState,
  selectPageStep
} from 'src/app/shared/state'
import { StepperItemComponent } from '..'

@Component( {
  standalone : true,
  selector   : 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls  : [ './stepper.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    StepperItemComponent,
    RouterLink
  ]
} )
export class StepperComponent {
  constructor( private store: Store<AppState> ) {
    this.store.select( selectPageStep )
        .subscribe(
          ( page ) => {
            this.currentPage = page
          }
        )
  }

  currentPage: number = 0
}
