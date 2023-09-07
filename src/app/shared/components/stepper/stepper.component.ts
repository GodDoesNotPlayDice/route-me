import { Component } from '@angular/core';
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { selectPageStep } from 'src/app/state/stepper/step.selectors'

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  constructor(private store : Store<AppState>) {
    this.store.select(selectPageStep).subscribe(
      (page) => {
        this.currentPage = page
      }
    )
  }
  currentPage : number = 0
}
