import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	OnInit
} from '@angular/core'
import {
	FormControl,
	Validators
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {
	IonicModule,
	ModalController
} from '@ionic/angular'
import { MultipleSelectorModalComponent } from 'src/app/shared/components/multiple-selector-modal/multiple-selector-modal.component'
import { MultipleSelectorData } from 'src/package/shared/domain/components/multiple-selector-data'

@Component( {
	standalone : true,
	selector   : 'app-multiple-selector-input',
	templateUrl: './multiple-selector-input.component.html',
	styleUrls  : [ './multiple-selector-input.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		MatInputModule,
		MatSelectModule,
		MultipleSelectorModalComponent
	]
} )
export class MultipleSelectorInputComponent implements OnInit {
	constructor( private modalCtrl: ModalController ) {}

	@Input() required = false
	@Input( { required: true } ) label: string
	@Input( { required: true } ) placeholder: string

	@Input() selectedData: MultipleSelectorData[] = []

	@Input( { required: true } ) databaseList: MultipleSelectorData[]

	readonly multipleSelectorControl = new FormControl<MultipleSelectorData[]>(
		[],
		control => {
			if ( this.required && control.value.length === 0 ) {
				control.addValidators( Validators.required )
				return { required: true }
			}
			return null
		} )

	public ngOnInit(): void {
		this.multipleSelectorControl.patchValue( this.selectedData )
		this.multipleSelectorControl.updateValueAndValidity()
	}

	async openModal() {
		const modal = await this.modalCtrl.create( {
			component     : MultipleSelectorModalComponent,
			componentProps: {
				databaseData: new Map<string, MultipleSelectorData>(
					this.databaseList.map(
						( data ) => [ data.id, data ] ) ),
				selectedData: new Map<string, MultipleSelectorData>(
					this.selectedData.map(
						( item ) => [ item.id, item ] ) )
			}
		} )
		await modal.present()

		const { data, role } = await modal.onWillDismiss()

		this.selectedData = data
		this.multipleSelectorControl.patchValue( this.selectedData )
		this.multipleSelectorControl.updateValueAndValidity()
	}

	reset(): void {
		this.selectedData = []
		this.multipleSelectorControl.reset()
	}
}
