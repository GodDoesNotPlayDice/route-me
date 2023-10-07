import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MapService } from 'src/app/shared/services/map.service'

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
  ]
} )
export class PublishPage implements ViewDidEnter {

  constructor( private map: MapService) {}

  @ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>


  ionViewDidEnter(): void {
    this.map.init( 'publish', this.divElementElementRef.nativeElement )
  }
  //TODO: cuando se haga click al boton publicar, deberia lanzar alerta de confirmacion
}
