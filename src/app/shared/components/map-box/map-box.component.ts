import {
	Component,
	ElementRef,
	ViewChild
} from '@angular/core'
import { ViewDidEnter } from '@ionic/angular'
import { MapService } from 'src/app/services'

@Component( {
	standalone : true,
	selector   : 'app-map-box',
	templateUrl: './map-box.component.html',
	styleUrls  : [ './map-box.component.scss' ]
} )
export class MapBoxComponent implements ViewDidEnter {
	constructor( private map: MapService ) {
	}
	@ViewChild( 'map' ) mapDivElement!: ElementRef<HTMLDivElement>

	ionViewDidEnter(): void {
		this.map.init(this.mapDivElement.nativeElement)
	}
}
