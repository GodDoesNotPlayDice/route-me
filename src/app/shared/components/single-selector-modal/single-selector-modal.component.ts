import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	OnInit
} from '@angular/core'
import {
	IonicModule,
	ModalController
} from '@ionic/angular'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { SingleSelectorData } from 'src/package/shared/domain/components/single-selector-data'

@Component( {
	standalone : true,
	selector   : 'app-single-selector-modal',
	templateUrl: './single-selector-modal.component.html',
	styleUrls  : [ './single-selector-modal.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		DividerComponent
	]
} )
export class SingleSelectorModalComponent implements OnInit {

	constructor( private modalCtrl: ModalController )
	{}

	@Input() lastSelected: SingleSelectorData | undefined
	@Input( { required: true } ) databaseData: SingleSelectorData[]
	// @Input({required:true})
	dataList = new Map<string, SingleSelectorData>()

	ngOnInit() {
		const list: SingleSelectorData[] = this.databaseData.map(
			( data ): SingleSelectorData =>
			{
				const notSelected = ( {
					...data,
					selected: false
				} )

				if ( this.lastSelected === undefined ) {
					return notSelected
				}

				if ( this.lastSelected.name !== data.name ) {
					return notSelected
				}
				else {
					return ( {
						...data,
						selected: true
					} )
				}
			} )

		this.dataList = new Map<string, SingleSelectorData>(
			list.map( ( item ) => [ item.name, item ] ) )
	}

	cancel() {
		return this.modalCtrl.dismiss( undefined, 'cancel' )
	}

	confirm() {
		return this.modalCtrl.dismiss( this.lastSelected, 'confirm' )
	}

	public selectCountry( name: string ): void {
		if ( this.lastSelected !== undefined ) {
			const countryEntry = this.dataList.get( this.lastSelected.name )
			if ( countryEntry !== undefined ) {
				countryEntry.selected = false
			}
		}

		const countrySelected = this.dataList.get( name )
		if ( countrySelected !== undefined ) {

			countrySelected.selected = true
			this.lastSelected        = countrySelected
		}
	}
}

