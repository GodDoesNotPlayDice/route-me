import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { AvatarHomeComponent } from 'src/app/shared/components/Avatars/avatar-home/avatar-home.component'

@Component({
  standalone: true,
  selector: 'app-passenger-item',
  templateUrl: './passenger-item.component.html',
  styleUrls: ['./passenger-item.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    AvatarHomeComponent,
    AdaptativeButtonComponent
  ]
})
export class PassengerItemComponent {
  @Input() userName : string = 'Juanito'
  @Input() userUrlImage : string = 'https://media.discordapp.net/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png?width=416&height=445'
}
