import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { FilledButtonComponent, StepperComponent } from 'src/app/shared/components'
import {
  AppState,
  StepState,
  selectCurrentStep,
  selectMaxStep,
  selectStepRegister,
  notifyStep
} from 'src/app/shared/state'

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
