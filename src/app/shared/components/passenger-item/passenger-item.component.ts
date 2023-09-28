import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  ViewChild
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {
  MatMenuModule,
  MatMenuTrigger
} from '@angular/material/menu'
import { IonicModule } from '@ionic/angular'
import { AdaptativeButtonComponent, AvatarComponent } from '..'


@Component( {
  standalone : true,
  selector   : 'app-passenger-item',
  templateUrl: './passenger-item.component.html',
  styleUrls  : [ './passenger-item.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    AvatarComponent,
    AdaptativeButtonComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ]
} )
export class PassengerItemComponent {
  @Input() text: string         = ''
  @Input() userName: string     = 'Juanito'
  @Input() userUrlImage: string = 'https://media.discordapp.net/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png?width=416&height=445'

  constructor() {
  }

  @ViewChild( MatMenuTrigger ) trigger!: MatMenuTrigger

  someMethod() {
    this.trigger.openMenu()
  }

}
