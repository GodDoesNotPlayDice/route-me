import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import {
  notifyStep
} from 'src/app/state/stepper/step.actions'

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page {

  constructor(private store : Store<AppState>) {
  }

  public submit( $event: SubmitEvent ): void {
    this.store.dispatch(notifyStep())
  }
}
