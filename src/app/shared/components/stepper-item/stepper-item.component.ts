import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-stepper-item',
  templateUrl: './stepper-item.component.html',
  styleUrls  : [ './stepper-item.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class StepperItemComponent {
  @Input({required: true}) step : number
  @Input({required: true}) currentStep : number
  @Input({required: true}) maxStep : number
}
