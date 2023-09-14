import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url/url.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor( private urlService: UrlService) {}

  prevHref: string = '/tabs/home'

  public ngOnInit(): void {
    this.urlService.previousUrl$.subscribe( ( url ) => {
      this.prevHref = url
    })
  }
}
