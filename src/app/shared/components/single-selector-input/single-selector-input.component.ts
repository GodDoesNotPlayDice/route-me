import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	OnInit
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {
	IonicModule,
	ModalController
} from '@ionic/angular'
import { SingleSelectorModalComponent } from 'src/app/shared/components/single-selector-modal/single-selector-modal.component'
import { SingleSelectorData } from 'src/package/shared/domain/components/single-selector-data'

@Component( {
	standalone : true,
	selector   : 'app-single-selector-input',
	templateUrl: './single-selector-input.component.html',
	styleUrls  : [ './single-selector-input.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		MatInputModule,
		MatSelectModule,
		SingleSelectorModalComponent
	]
} )
export class SingleSelectorInputComponent implements OnInit {

	constructor( private modalCtrl: ModalController ) {}

	@Input( { required: true } ) databaseData: SingleSelectorData[]
	@Input( { required: true } ) errorText: string
	lastSelected: SingleSelectorData | undefined
	@Input( { required: true } ) label: string
	@Input() required = false
	initialLabel      = ''

	readonly singleSelectorControl = new FormControl( '', control => {
		if ( this.required && control.value === '' ) {
			return { required: true }
		}
		return null
	} )

	ngOnInit(): void {
		this.initialLabel = this.label
		this.singleSelectorControl.updateValueAndValidity()
	}

	async openModal() {
		const modal = await this.modalCtrl.create( {
			component     : SingleSelectorModalComponent,
			componentProps: {
				lastSelected: this.lastSelected,
				databaseData: this.databaseData
			}
		} )
		await modal.present()

		const { data, role } = await modal.onWillDismiss()

		this.lastSelected = data

		if ( this.lastSelected !== undefined ) {
			this.label = this.lastSelected.name

			this.singleSelectorControl.patchValue( this.lastSelected.id )
			this.singleSelectorControl.updateValueAndValidity()
		}
	}

	reset(): void {
		this.label = this.initialLabel
		this.singleSelectorControl.reset()
	}
}
