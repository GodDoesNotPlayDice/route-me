import {
  Component,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { PreferenceItem } from 'src/app/shared/components/user-preferences-selector/user-preferences-selector.component'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'
import {
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister
} from 'src/app/state/stepper/step.selectors'
import { StepState } from 'src/app/state/stepper/step.state'
import { selectUserPreferencesRegister } from 'src/app/state/user-register/user-register.selectors'
import { UserRegisterState } from 'src/app/state/user-register/user-register.state'

@Component( {
  selector   : 'app-step4',
  templateUrl: './step4.page.html',
  styleUrls  : [ './step4.page.scss' ]
} )
export class Step4Page implements OnInit {

  constructor( private store: Store<AppState>) {
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
    this.registerStep$.subscribe((step) => {
      if (step.maxStep - 1 === step.currentStep) {
        this.canFinish = true
      }
    })
  }
}
