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
import { MultipleSelectorItemComponent } from 'src/app/shared/components/multiple-selector-item/multiple-selector-item.component'
import { MultipleSelectorData } from 'src/package/shared/domain/components/multiple-selector-data'

@Component( {
	standalone : true,
	selector   : 'app-multiple-selector-modal',
	templateUrl: './multiple-selector-modal.component.html',
	styleUrls  : [ './multiple-selector-modal.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		MultipleSelectorItemComponent,
		DividerComponent
	]
} )
export class MultipleSelectorModalComponent implements OnInit {
	constructor( private modalCtrl: ModalController ) {
	}

	ngOnInit(): void {
		this.dataList = Array.from( this.databaseData.values() )
		                     .map( ( data ): MultipleSelectorData => {
			                     const isSelected = this.selectedData.get( data.id )
			                     if ( isSelected !== undefined ) {
				                     return ( {
					                     ...data,
					                     selected: true
				                     } )
			                     }
			                     else {
				                     return ( {
					                     ...data,
					                     selected: false
				                     } )
			                     }
		                     } )
	}

	dataList: MultipleSelectorData[] = []

	@Input( { required: true } )
	databaseData = new Map<string, MultipleSelectorData>()

	@Input( { required: true } )
	selectedData = new Map<string, MultipleSelectorData>()

	cancel() {
		return this.modalCtrl.dismiss( [], 'cancel' )
	}

	confirm() {
		return this.modalCtrl.dismiss(
			Array.from( this.selectedData.values() ), 'confirm'
		)
	}

	public onSelectItem( $event: string ): void {

		const pref = this.databaseData.get( $event )

		if ( pref !== undefined ) {
			this.selectedData.set( pref.id, pref )
		}
	}

	public onDeselectItem( $event: string ): void {
		const pref = this.databaseData.get( $event )

		if ( pref !== undefined ) {
			this.selectedData.delete( pref.id )
		}
	}
}

