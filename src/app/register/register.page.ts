import { CommonModule } from '@angular/common'
import {
  Component,
  EnvironmentInjector,
  inject
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { addStep } from 'src/app/state/stepper/step.actions'

@Component( {
  standalone : true,
  selector   : 'app-register',
  templateUrl: './register.page.html',
  styleUrls  : [ './register.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class RegisterPage {
  public environmentInjector = inject( EnvironmentInjector )

  constructor( private store: Store<AppState> ) {
    this.store.dispatch( addStep() )
    this.store.dispatch( addStep() )
    this.store.dispatch( addStep() )
  }
}
