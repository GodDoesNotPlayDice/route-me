import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core'
import {
  Router,
  RouterLink
} from '@angular/router'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { ItemListComponent } from 'src/app/shared/components/item-list/item-list.component'
import { MapService } from 'src/app/shared/services/map.service'
import { UrlService } from 'src/app/shared/services/url.service'

@Component( {
  standalone : true,
  selector   : 'app-trip-details',
  templateUrl: './trip-details.page.html',
  imports    : [
    IonicModule,
    CommonModule,
    AdaptativeButtonComponent,
    DividerComponent,
    ItemListComponent,
    RouterLink
  ],
  styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit, ViewDidEnter {

  constructor( private urlService: UrlService,
    private map: MapService,
    private router: Router )
  {}

  prevHref: string = '/tabs/home'

  async ngOnInit(): Promise<void> {
    this.urlService.previousUrl$.subscribe( ( url ) => {
      this.prevHref = url
    } )
    console.log( this.router.getCurrentNavigation()?.extras.state )
  }

  @ViewChild( 'dmap' ) divElementElementRef!: ElementRef<HTMLDivElement>

  async ionViewDidEnter(): Promise<void> {
    await this.map.init( 'detail', this.divElementElementRef.nativeElement )
  }
}
