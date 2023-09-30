import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core'
import {
  FormGroup,
  FormsModule
} from '@angular/forms'
import { Router } from '@angular/router'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputAreaComponent } from 'src/app/shared/components/input-area/input-area.component'
import { PreferencesSelectorBarComponent } from 'src/app/shared/components/preferences-selector-bar/preferences-selector-bar.component'
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
    InputAreaComponent,
    PreferencesSelectorBarComponent,
    FilledButtonComponent,
    FormsModule
  ],
  styleUrls  : [ './step3.page.scss' ]
} )
export class Step3Page implements OnInit, ViewDidEnter {

  constructor( private store: Store<AppState>, private router: Router ) {
    this.registerStep$ = this.store.select( selectStepRegister )
    this.currentStep$  = this.store.select( selectCurrentStep )
    this.maxStep$      = this.store.select( selectMaxStep )
  }

  @ViewChild( 'area' ) areaInput !: InputAreaComponent
  @ViewChild(
    'preference' ) preferenceInput !: PreferencesSelectorBarComponent

  registerStep$: Observable<StepState>
  currentStep$: Observable<number>
  maxStep$: Observable<number>
  canFinish: boolean = false
  formGroup!: FormGroup

  ionViewDidEnter() {
    this.formGroup = new FormGroup( [
      this.areaInput.textControl,
      this.preferenceInput.preferencesControl
    ] )
  }

  async submit( $event: SubmitEvent ) {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if ( !this.formGroup.valid ) {
      return
    }

    //TODO: breaking. enviar update a authService
    //TODO: clear preferences
    this.store.dispatch( notifyStep() )
    await this.router.navigate( [ '/tabs/home' ] )
  }

  public ngOnInit(): void {
    this.registerStep$.subscribe( ( step ) => {
      if ( step.maxStep === step.currentStep ) {
        this.canFinish = true
      }
    } )
  }
}
