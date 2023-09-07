import {
  Component,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page {

  constructor(private store : Store<AppState>) {
  }

  public submit( $event: SubmitEvent ): void {
    $event.preventDefault()
    this.store.dispatch(notifyStep())
  }
}
