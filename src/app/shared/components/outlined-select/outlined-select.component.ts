import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-outlined-select',
  templateUrl: './outlined-select.component.html',
  styleUrls  : [ './outlined-select.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class OutlinedSelectComponent {
}
