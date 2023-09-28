import { CommonModule } from '@angular/common'
import {
  Component,
  EnvironmentInjector,
  inject
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { AppState, addStep } from 'src/app/shared/state'

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
