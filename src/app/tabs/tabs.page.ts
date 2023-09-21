import { CommonModule } from '@angular/common'
import {
  Component,
  EnvironmentInjector,
  inject
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls  : [ './tabs.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class TabsPage {
  public environmentInjector = inject( EnvironmentInjector )

}
