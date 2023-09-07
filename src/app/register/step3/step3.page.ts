import {
  Component,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'
import {
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister
} from 'src/app/state/stepper/step.selectors'
import { StepState } from 'src/app/state/stepper/step.state'

@Component( {
  selector   : 'app-step3',
  templateUrl: './step3.page.html',
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
