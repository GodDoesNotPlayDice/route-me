import {
  Component,
  Input
} from '@angular/core'

@Component({
  selector: 'app-bubble-chat',
  templateUrl: './bubble-chat.component.html',
  styleUrls: ['./bubble-chat.component.scss'],
})
export class BubbleChatComponent {

  @Input({required: true}) message !: string
  @Input({required: true}) userName !: string
  @Input({required: true}) urlImage !: string
  @Input({required: true}) owner !: boolean
}
