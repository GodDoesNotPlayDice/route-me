import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnDestroy,
	ViewChild
} from '@angular/core'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component'
import { MapService } from 'src/app/shared/services/map.service'

@Component( {
	standalone : true,
	selector   : 'app-search',
	templateUrl: './search.page.html',
	styleUrls  : [ './search.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		SearchInputComponent,
		InputTextComponent
	]
} )
export class SearchPage implements ViewDidEnter, OnDestroy {

	constructor( private map: MapService ) {}

	@ViewChild( 'search' ) searchInput!: SearchInputComponent
	@ViewChild( 'smap' ) divElementElementRef!: ElementRef<HTMLDivElement>

//TODO: tomar near trips (pasarlos a home tambien)
	async ionViewDidEnter(): Promise<void> {
		await this.map.init( 'search', this.divElementElementRef.nativeElement )
	}

	async ngOnDestroy(): Promise<void> {
		await this.map.removeMap( 'search' )
	}
}
