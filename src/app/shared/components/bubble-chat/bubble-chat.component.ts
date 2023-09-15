import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  selector: 'app-bubble-chat',
  templateUrl: './bubble-chat.component.html',
  styleUrls: ['./bubble-chat.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class BubbleChatComponent {

  @Input({required: true}) message !: string
  @Input({required: true}) userName !: string
  @Input({required: true}) urlImage !: string
  @Input({required: true}) owner !: boolean
}
