import { CommonModule } from '@angular/common'
import {
  Component,
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
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputAreaComponent } from 'src/app/shared/components/input-area/input-area.component'
import { MultipleSelectorInputComponent } from 'src/app/shared/components/multiple-selector-input/multiple-selector-input.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UserPreferenceService } from 'src/app/shared/services/user-preference.service'
import { AppState } from 'src/app/shared/state/app.state'
import {
  clearStep,
  notifyStep
} from 'src/app/shared/state/stepper/step.actions'
import { MultipleSelectorData } from 'src/package/shared/domain/components/multiple-selector-data'

@Component( {
  standalone : true,
  selector   : 'app-step3',
  templateUrl: './step3.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    StepperComponent,
    InputAreaComponent,
    MultipleSelectorInputComponent,
    FilledButtonComponent,
    FormsModule,
    AppBarCloneComponent
  ],
  styleUrls  : [ './step3.page.scss' ]
} )
export class Step3Page implements ViewDidEnter {

  constructor( private store: Store<AppState>, private router: Router,
    private toastService: ToastService,
    private userPreferenceService: UserPreferenceService,
    private auth: AuthService )
  {
    this.preferences = this.userPreferenceService.getPreferences()
                           .map(
                             ( preference ): MultipleSelectorData => ( {
                               id      : preference.id.value,
                               name    : preference.name.value,
                               icon    : preference.icon.value,
                               selected: false
                             } ) )
  }

  @ViewChild( 'appBar' ) appBar !: AppBarCloneComponent
  @ViewChild( 'area' ) areaInput !: InputAreaComponent
  @ViewChild( 'preference' ) preferenceInput !: MultipleSelectorInputComponent

  formGroup!: FormGroup

  readonly preferences: MultipleSelectorData[] = []

  ionViewDidEnter() {
    this.formGroup = new FormGroup( [
      this.areaInput.textControl,
      this.preferenceInput.multipleSelectorControl
    ] )
  }

  async submit() {
    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if ( !this.formGroup.valid ) {
      return
    }

    const updated = await this.auth.updatePassenger( {
      description: this.areaInput.textControl.value!,
      preferences: this.preferenceInput.multipleSelectorControl.value!
    } )

    if ( !updated ) {
      await this.toastService.presentToast( {
        message : 'Hubo un problema. Intente denuevo',
        duration: 1500,
        position: 'bottom'
      } )
      return
    }

    this.store.dispatch( notifyStep() )
    await this.router.navigate( [ '/tabs/home' ] )
    this.store.dispatch( clearStep() )
  }

  async buttonClick(): Promise<void> {
    await this.submit()
    this.reset()
  }

  async leadClick(): Promise<void> {
    const isDelete = await this.auth.deleteAccount()
    if ( isDelete ) {
      await this.appBar.backPage()
    }
    else {
      await this.toastService.presentToast( {
        message : 'Hubo un problema. Intente denuevo',
        duration: 1500,
        position: 'bottom'
      } )
    }
  }

  private reset(): void {
    this.areaInput.reset()
    this.preferenceInput.reset()
  }
}
