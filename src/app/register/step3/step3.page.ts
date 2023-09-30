import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AppState } from 'src/app/shared/state/app.state'
import { notifyStep } from 'src/app/shared/state/stepper/step.actions'
import {
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister
} from 'src/app/shared/state/stepper/step.selectors'
import { StepState } from 'src/app/shared/state/stepper/step.state'

@Component( {
  standalone : true,
  selector   : 'app-step3',
  templateUrl: './step3.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    StepperComponent,
    FilledButtonComponent,
    FormsModule
  ],
  styleUrls  : [ './step3.page.scss' ]
} )
export class Step3Page implements OnInit {

  constructor( private store: Store<AppState> ) {
    this.registerStep$ = this.store.select( selectStepRegister )
    this.currentStep$  = this.store.select( selectCurrentStep )
    this.maxStep$      = this.store.select( selectMaxStep )
  }

  registerStep$: Observable<StepState>
  currentStep$: Observable<number>
  maxStep$: Observable<number>
  canFinish: boolean = false

  public submit( $event: SubmitEvent ): void {
    this.store.dispatch( notifyStep() )
  }

  public ngOnInit(): void {
    this.registerStep$.subscribe( ( step ) => {
      if ( step.maxStep - 1 === step.currentStep ) {
        this.canFinish = true
      }
    } )
  }
}
