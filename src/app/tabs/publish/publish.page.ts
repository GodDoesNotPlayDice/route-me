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
import {
  AdaptativeButtonComponent,
  DateSelectorComponent,
  InputTextComponent
} from 'src/app/shared/components'
import { MapService } from 'src/app/shared/services'

@Component( {
  standalone : true,
  selector   : 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls  : [ './publish.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    InputTextComponent,
    DateSelectorComponent,
    AdaptativeButtonComponent
  ]
} )
export class PublishPage implements ViewDidEnter {

  constructor( private map: MapService ) {}

  @ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>


  ionViewDidEnter(): void {
    this.map.init( 'publish', this.divElementElementRef.nativeElement )
  }
}
