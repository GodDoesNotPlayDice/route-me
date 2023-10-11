import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls  : [ './divider.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class DividerComponent {
}
