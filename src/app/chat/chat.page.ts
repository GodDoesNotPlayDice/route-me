import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { BubbleChatComponent } from 'src/app/shared/components/bubble-chat/bubble-chat.component'
import { ChatInputComponent } from 'src/app/shared/components/chat-input/chat-input.component'
import { UrlService } from 'src/app/shared/services/url.service'

@Component( {
  standalone : true,
  selector   : 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls  : [ './chat.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    BubbleChatComponent,
    ChatInputComponent
  ]
} )
export class ChatPage implements OnInit {

  constructor( private urlService: UrlService ) {}

  prevHref: string = '/tabs/home'

  public ngOnInit(): void {
    this.urlService.previousUrl$.subscribe( ( url ) => {
      this.prevHref = url
    } )
  }
}
