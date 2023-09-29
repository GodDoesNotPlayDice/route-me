import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import {
  AppState,
  selectStepRegister
} from 'src/app/shared/state'
import { StepperItemComponent } from 'src/app/shared/components'

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
    console.log( 'StepperComponent')
    this.store.select( selectStepRegister )
        .subscribe( ( step ) => {
          console.log( 'step', step )
            this.currentStep = step.currentStep
            this.maxStep = step.maxStep
          }
        )
  }

  currentStep: number = -1
  maxStep: number = 0
}
