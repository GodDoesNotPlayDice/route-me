import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import {
  Router,
  RouterLink
} from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { UrlService } from 'src/app/services/url.service'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { PassengerItemComponent } from 'src/app/shared/components/passenger-item/passenger-item.component'

@Component( {
  standalone : true,
  selector   : 'app-trip-details',
  templateUrl: './trip-details.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    AdaptativeButtonComponent,
    DividerComponent,
    PassengerItemComponent,
    RouterLink
  ],
  styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit {

  constructor( private urlService: UrlService,
    private router: Router )
  {}

  prevHref: string = '/tabs/home'

  public ngOnInit(): void {
    this.urlService.previousUrl$.subscribe( ( url ) => {
      this.prevHref = url
    } )
    console.log( this.router.getCurrentNavigation()?.extras.state )
  }
}
