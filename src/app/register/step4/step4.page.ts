import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ViewDidEnter } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { InputAreaComponent } from 'src/app/shared/components/input-area/input-area.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { UserPreferencesSelectorComponent } from 'src/app/shared/components/user-preferences-selector/user-preferences-selector.component'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'
import {
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister
} from 'src/app/state/stepper/step.selectors'
import { StepState } from 'src/app/state/stepper/step.state'

@Component( {
  selector   : 'app-step4',
  templateUrl: './step4.page.html',
  styleUrls  : [ './step4.page.scss' ]
} )
export class Step4Page implements OnInit, ViewDidEnter {

  constructor( private store: Store<AppState>) {
    this.registerStep$ = this.store.select( selectStepRegister )
    this.currentStep$  = this.store.select( selectCurrentStep )
    this.maxStep$      = this.store.select( selectMaxStep )
  }

  //@ViewChild('area') areaInput !: InputAreaComponent
  //@ViewChild('preference') preferenceInput !: UserPreferencesSelectorComponent

  registerStep$: Observable<StepState>
  currentStep$: Observable<number>
  maxStep$: Observable<number>
  canFinish: boolean = false
  formGroup! : FormGroup

  ionViewDidEnter() {
    this.formGroup = new FormGroup([
    ])
  }

  public submit( $event: SubmitEvent ): void {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if(
      !this.formGroup.valid
    ) return

    console.log("step 3 check")
    this.store.dispatch(notifyStep())
  }

  public ngOnInit(): void {
    this.registerStep$.subscribe((step) => {
      if (step.maxStep - 1 === step.currentStep) {
        this.canFinish = true
      }
    })
  }
}
