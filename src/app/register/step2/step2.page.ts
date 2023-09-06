import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page {

  constructor(private store : Store<AppState>) {
  }
}
