import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import {
  NavigationEnd,
  Router
} from '@angular/router'
import { IonicModule } from '@ionic/angular'
// import {
//   Dropdown,
//   initTE,
//   Input,
//   Ripple
// } from 'tw-elements'
import { CountryPhoneCodeService, UrlService } from 'src/app/shared/services'

@Component( {
  standalone : true,
  selector   : 'app-root',
  templateUrl: 'app.component.html',
  imports    : [
    IonicModule,
    CommonModule
  ],
  styleUrls  : [ 'app.component.scss' ]
} )
export class AppComponent implements OnInit {

  constructor( private router: Router,
    private countryPhoneCode: CountryPhoneCodeService,
    private urlService: UrlService )
  {}

  ngOnInit() {
    this.router.events.subscribe( ( val ) => {
      if ( val instanceof NavigationEnd ) {
        this.urlService.setPreviousUrl( val.url )
      }
    } )

    // initTE( { Input, Dropdown, Ripple } )
  }
}
