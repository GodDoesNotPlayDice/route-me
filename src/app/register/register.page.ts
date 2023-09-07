import { Component } from '@angular/core';
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { addStep } from 'src/app/state/stepper/step.actions'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(private store : Store<AppState>) {
    this.store.dispatch(addStep())
    this.store.dispatch(addStep())
    this.store.dispatch(addStep())
  }
}
