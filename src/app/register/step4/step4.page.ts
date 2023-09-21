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
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'
import {
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister
} from 'src/app/state/stepper/step.selectors'
import { StepState } from 'src/app/state/stepper/step.state'
import {
  clearUserRegister,
  updateUserRegister
} from 'src/app/state/user-register/user-register.actions'
import { selectUserRegister } from 'src/app/state/user-register/user-register.selectors'
import { UserPreferencesSelectorBarComponent } from '../../shared/components/user-preferences-selector-bar/user-preferences-selector-bar.component'

@Component( {
  standalone : true,
  selector   : 'app-step4',
  templateUrl: './step4.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    StepperComponent,
    InputAreaComponent,
    UserPreferencesSelectorBarComponent,
    FilledButtonComponent,
    FormsModule
  ],
  styleUrls  : [ './step4.page.scss' ]
} )
export class Step4Page implements OnInit, ViewDidEnter {

  constructor( private store: Store<AppState>, private router: Router ) {
    this.registerStep$ = this.store.select( selectStepRegister )
    this.currentStep$  = this.store.select( selectCurrentStep )
    this.maxStep$      = this.store.select( selectMaxStep )
  }

  @ViewChild( 'area' ) areaInput !: InputAreaComponent
  @ViewChild(
    'preference' ) preferenceInput !: UserPreferencesSelectorBarComponent

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

    // TODO: revisar mejor forma de desuscribirse
    const userRegister$ = this.store.select( selectUserRegister )
                              .subscribe( ( userRegister ) => {
                                if ( userRegister.description !== '' ) {
                                  console.log( userRegister )
                                }
                              } )

    this.store.dispatch( updateUserRegister( {
      description: this.areaInput.textControl.value!,
      preferences: this.preferenceInput.preferencesControl.value!
    } ) )

    // TODO: revisar pipe takeLast(1)
    userRegister$.unsubscribe()
    this.store.dispatch( notifyStep() )
    this.store.dispatch( clearUserRegister() )
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
