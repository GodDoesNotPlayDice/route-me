import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { setPageStep } from 'src/app/state/stepper/step.actions'

@Component({
  standalone: true,
  selector: 'app-stepper-item',
  templateUrl: './stepper-item.component.html',
  styleUrls: ['./stepper-item.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class StepperItemComponent {
  constructor(private store : Store<AppState>) {
  }
  @Input() step !: number
  @Input() currentPage !: number
  public link( $event: MouseEvent ): void {
    this.store.dispatch(setPageStep({ page: this.step}))
  }
}
