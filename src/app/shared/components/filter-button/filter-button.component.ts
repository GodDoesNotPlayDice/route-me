import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
  FilterButtonData,
} from 'src/app/shared/models'

@Component( {
  standalone : true,
  selector   : 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls  : [ './filter-button.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class FilterButtonComponent {
  @Input() data!: FilterButtonData
}
