import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild
} from '@angular/core'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MapBoxComponent } from 'src/app/shared/components/map-box/map-box.component'

@Component( {
  standalone : true,
  selector   : 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls  : [ './publish.page.scss' ],
  imports: [
    IonicModule,
    CommonModule,
    InputTextComponent,
    DateSelectorComponent,
    AdaptativeButtonComponent,
    MapBoxComponent
  ]
} )
export class PublishPage implements ViewDidEnter{
  @ViewChild( MapBoxComponent ) mapBox!: MapBoxComponent

  ionViewDidEnter(): void {
    this.mapBox.ionViewDidEnter()
  }
}
