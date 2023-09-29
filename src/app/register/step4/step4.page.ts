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
import {
  AppState,
  notifyStep,
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister,
  StepState
} from 'src/app/shared/state'

@Component( {
  standalone : true,
  selector   : 'app-step4',
  templateUrl: './step4.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    StepperComponent,
    InputAreaComponent,
    PreferencesSelectorBarComponent,
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

    // const userRegister$ = this.store.select( selectPassengerRegister )
    //                           .subscribe( ( userRegister ) => {
    //                             if ( userRegister.description !== '' ) {
    //                               console.log( userRegister )
    //                             }
    //                           } )

    // this.store.dispatch( updatePassengerRegister( {
    //   description: this.areaInput.textControl.value!,
    //   preferences: this.preferenceInput.preferencesControl.value!
    // } ) )

    // TODO: revisar mejor forma de desuscribirse, revisar pipe takeLast(1)
    // userRegister$.unsubscribe()
    this.store.dispatch( notifyStep() )
    // this.store.dispatch( clearPassengerRegister() )
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
